import * as Path from 'path';

import * as _ from 'lodash';
import {Dict} from 'tslang';
import {
  AbstractWalker,
  IOptions,
  IRuleMetadata,
  RuleFailure,
  Rules,
} from 'tslint';
import {ImportKind, findImports} from 'tsutils';
import {Expression, SourceFile} from 'typescript';

import {
  getBaseNameWithoutExtension,
  removeQuotes,
  searchUpperDir,
} from '../utils';

interface RuleOptions {
  baseUrl: string;
  tsConfigSearchName: string;
  rules: Dict<string[] | undefined>;
}

const ERROR_MESSAGE_BANNED_HIERARCHY_IMPORT =
  'Cannot import this module according to the tslint config';

export class Rule extends Rules.AbstractRule {
  private parsedOptions: RuleOptions;

  constructor(options: IOptions) {
    super(options);
    this.parsedOptions = options.ruleArguments[0];

    if (!this.parsedOptions || !this.parsedOptions.baseUrl) {
      throw new Error('Option baseUrl is required');
    }
  }

  apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(
      new ImportPathStrictHierarchyWalker(
        sourceFile,
        Rule.metadata.ruleName,
        this.parsedOptions,
      ),
    );
  }

  static metadata: IRuleMetadata = {
    ruleName: 'import-path-strict-hierarchy',
    description: '',
    optionsDescription: '',
    options: {
      properties: {
        baseUrl: {
          type: 'string',
        },
        searchName: {
          type: 'string',
        },
        rules: {
          additionalProperties: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          type: 'object',
        },
      },
      type: 'object',
    },
    type: 'maintainability',
    hasFix: false,
    typescriptOnly: false,
  };
}

class ImportPathStrictHierarchyWalker extends AbstractWalker<RuleOptions> {
  private importExpressions: Expression[] = [];

  private sourceDir: string;
  private baseUrlDir: string;

  constructor(sourceFile: SourceFile, ruleName: string, options: RuleOptions) {
    super(sourceFile, ruleName, options);

    this.sourceDir = Path.normalize(Path.dirname(sourceFile.fileName));

    this.baseUrlDir = Path.join(
      searchUpperDir(
        this.sourceDir,
        this.options.tsConfigSearchName || 'tsconfig.json',
      ),
      options.baseUrl,
    );
  }

  walk(sourceFile: SourceFile): void {
    for (let expression of findImports(sourceFile, ImportKind.AllImports)) {
      this.importExpressions.push(expression);
    }

    this.validate();
  }

  getFirstPartInRelativePath(path: string): any {
    return Path.relative(this.baseUrlDir, path).split(Path.sep)[0];
  }

  private checkPath(
    specifierFirstPart: string,
    checkingFirstPart: string,
    first = true,
  ): boolean {
    if (specifierFirstPart === checkingFirstPart) {
      return true;
    }

    let {rules: ruleDict} = this.options;

    let allowedNames = ruleDict[checkingFirstPart];

    if (allowedNames && specifierFirstPart !== '..') {
      if (allowedNames.includes(specifierFirstPart)) {
        return true;
      }

      for (let name of allowedNames) {
        if (this.checkPath(specifierFirstPart, name, false)) {
          return true;
        }
      }

      return false;
    } else {
      return first;
    }
  }

  private validate(): void {
    let fileName = Path.normalize(this.sourceFile.fileName);

    let currentDir = Path.dirname(fileName);

    let checkingPath =
      currentDir === this.baseUrlDir
        ? Path.join(currentDir, getBaseNameWithoutExtension(fileName))
        : currentDir;

    for (let expression of this.importExpressions) {
      let importPath = Path.join(
        currentDir,
        removeQuotes(expression.getText()),
      );

      let specifierFirstPart = this.getFirstPartInRelativePath(importPath);
      let checkingFirstPart = this.getFirstPartInRelativePath(checkingPath);

      if (!this.checkPath(specifierFirstPart, checkingFirstPart)) {
        this.addFailureAtNode(
          expression.parent,
          ERROR_MESSAGE_BANNED_HIERARCHY_IMPORT,
        );
      }
    }
  }
}
