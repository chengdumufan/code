import FS from 'fs';
import Path from 'path';

import {
  AST_NODE_TYPES,
  TSESLint,
  TSESTree,
} from '@typescript-eslint/experimental-utils';
import _ from 'lodash';

import {
  createRule,
  getBaseNameWithoutExtension,
  getFullStart,
  getModuleSpecifier,
  hasKnownModuleFileExtension,
  isRelativeModuleSpecifier,
  removeModuleFileExtension,
} from './@utils';

const messages = {
  bannedImport:
    'This module can not be imported, because it contains internal module with prefix `@` under a parallel directory.',
  bannedExport:
    'This module can not be exported, because it contains internal module with prefix `@` under a parallel directory.',
  missingExports: 'Missing modules expected to be exported.',
  missingImports: 'Missing modules expected to be imported.',
  bannedImportWhenNamespaceExists:
    'This module can not be imported since namespace file exists',
  bannedExportWhenNamespaceExists:
    'This module can not be exported since namespace file exists',
};

type Options = [];

type MessageId = keyof typeof messages;

export const scopedModulesRule = createRule<Options, MessageId>({
  name: 'scoped-modules',
  meta: {
    docs: {
      description: '',
      recommended: 'error',
    },
    messages,
    schema: [
      {
        type: 'object',
        properties: {
          baseUrl: {
            type: 'string',
          },
          hierarchy: {
            type: 'object',
            additionalProperties: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    ],
    type: 'suggestion',
    fixable: 'code',
  },
  defaultOptions: [],

  create(context) {
    const INDEX_FILE_REGEX = /(?:^|[\\/])index\.(?:js|jsx|ts|tsx|d\.ts)$/i;
    const NAMESPACE_FILE_REGEX = /(?:^|[\\/])namespace\.(?:js|jsx|ts|tsx|d\.ts)$/i;

    const BANNED_IMPORT_REGEX = /^(?!(?:\.{1,2}[\\/])+@(?!.*[\\/]@)).*[\\/]@/;
    const BANNED_EXPORT_REGEX = /[\\/]@/;
    const BANNED_EXPORT_REGEX_FOR_AT_PREFIXED = /^\.[\\/]@(?:.*?)[\\/]@/;

    type ModuleStatement =
      | TSESTree.ImportDeclaration
      | TSESTree.ExportNamedDeclaration
      | TSESTree.ExportAllDeclaration;

    type ModuleStatementInfo =
      | ImportStatementInfo
      | ExportStatementInfo
      | ExportAsStatementInfo;
    type ModuleStatementType = ModuleStatementInfo['type'];

    interface ImportStatementInfo {
      type: 'import';
      statement: ModuleStatement;
      specifier: string;
    }

    interface ExportStatementInfo {
      type: 'export';
      statement: ModuleStatement;
      specifier: string;
    }

    interface ExportAsStatementInfo {
      type: 'export-as';
      statement: ModuleStatement;
      specifier: string;
    }

    function validateImportOrExport({
      type,
      statement,
      specifier,
    }: ModuleStatementInfo): void {
      let bannedPattern: RegExp;
      let messageId: 'bannedImport' | 'bannedExport';

      if (type === 'import') {
        bannedPattern = BANNED_IMPORT_REGEX;
        messageId = 'bannedImport';
      } else {
        bannedPattern = BANNED_EXPORT_REGEX;
        messageId = 'bannedExport';

        let fileName = context.getFilename();

        let baseName = getBaseNameWithoutExtension(fileName);

        if (baseName.startsWith('@')) {
          bannedPattern = BANNED_EXPORT_REGEX_FOR_AT_PREFIXED;
        }
      }

      if (bannedPattern.test(specifier)) {
        context.report({
          node: statement,
          messageId,
          fix:
            type === 'export'
              ? fixer => {
                  let tokenAfter = context
                    .getSourceCode()
                    .getTokenAfter(statement);

                  return fixer.replaceTextRange(
                    [
                      statement.range[0],
                      // eslint-disable-next-line no-null/no-null
                      tokenAfter === null
                        ? context.getSourceCode().getText().length
                        : tokenAfter.range[0],
                    ],
                    '',
                  );
                }
              : undefined,
        });
      }
    }

    function validateIndexFile(infos: ModuleStatementInfo[]): void {
      let fileName = context.getFilename();
      let dirName = Path.dirname(fileName);
      let fileNames: string[];

      try {
        fileNames = FS.readdirSync(dirName);
      } catch (error) {
        console.error(
          `Index validation aborted due to failure of reading: ${dirName}`,
        );
        return;
      }

      let hasNamespaceFile =
        fileNames.filter(fileName => NAMESPACE_FILE_REGEX.test(fileName))
          .length >= 1;

      if (hasNamespaceFile) {
        for (let info of infos) {
          let {type, specifier, statement} = info;

          /**
           *  When there's a namespace file in the directory, we should just export the namespace.
           *  The code below will report an error when you write 'export * from xxx' or when you import
           *  a module which is not the namespace file.
           */
          if (
            type === 'export' ||
            ((type === 'import' || type === 'export-as') &&
              specifier !== './namespace')
          ) {
            context.report({
              node: statement,
              messageId:
                type === 'import'
                  ? 'bannedImportWhenNamespaceExists'
                  : 'bannedExportWhenNamespaceExists',
              fix: fixer => {
                return fixer.replaceTextRange(
                  [
                    getFullStart(context.getSourceCode(), statement),
                    statement.range[1],
                  ],
                  '',
                );
              },
            });
          }
        }

        let importSpecifiers = infos
          .filter(info => info.type === 'import' || info.type === 'export-as')
          .map(info => info.specifier);

        let expectedImportSpecifiers = ['./namespace'];

        let missingImportIds = _.difference(
          expectedImportSpecifiers,
          importSpecifiers,
        );

        if (missingImportIds.length) {
          context.report({
            node: context.getSourceCode().ast,
            messageId: 'missingImports',
            fix: fixer => {
              return fixer.replaceTextRange(
                context.getSourceCode().ast.range,
                `${[
                  context.getSourceCode().getText().trimRight(),
                  `export * as Namespace from './namespace';`,
                ]
                  .filter(text => !!text)
                  .join('\n')}\n`,
              );
            },
          });
        }
      } else {
        validateFile(dirName, fileNames);
      }
    }

    function validateNamespaceFile(): void {
      let fileName = context.getFilename();
      let dirName = Path.dirname(fileName);
      let fileNames;

      try {
        fileNames = FS.readdirSync(dirName);
      } catch (error) {
        console.error(
          `Index validation aborted due to failure of reading: ${dirName}`,
        );
        return;
      }

      validateFile(dirName, fileNames);
    }

    function validateFile(dirName: string, fileNames: string[]): void {
      let exportSpecifiers = infos
        .filter(info => info.type === 'export')
        .map(info => info.specifier);

      let expectedExportSpecifiers = fileNames
        .map((fileName): string | undefined => {
          if (fileName.startsWith('.')) {
            return undefined;
          }

          let entryFullPath = Path.join(dirName, fileName);
          let stats;

          try {
            stats = FS.statSync(entryFullPath);
          } catch (error) {
            return undefined;
          }

          let specifier: string;

          if (stats.isFile()) {
            if (
              INDEX_FILE_REGEX.test(fileName) ||
              NAMESPACE_FILE_REGEX.test(fileName) ||
              !hasKnownModuleFileExtension(fileName)
            ) {
              return undefined;
            }

            specifier = `./${removeModuleFileExtension(fileName)}`;
          } else if (stats.isDirectory()) {
            let entryNamesInFolder;

            try {
              entryNamesInFolder = FS.readdirSync(entryFullPath);
            } catch (error) {
              return undefined;
            }

            let hasIndexFile = entryNamesInFolder.some(entryNameInFolder =>
              INDEX_FILE_REGEX.test(entryNameInFolder),
            );

            if (!hasIndexFile) {
              return undefined;
            }

            specifier = `./${fileName}`;
          } else {
            return undefined;
          }

          if (BANNED_EXPORT_REGEX.test(specifier)) {
            return undefined;
          }

          return specifier;
        })
        .filter((entryName): entryName is string => !!entryName);

      let missingExportSpecifiers = _.difference(
        expectedExportSpecifiers,
        exportSpecifiers.map(specifier =>
          isRelativeModuleSpecifier(specifier)
            ? removeModuleFileExtension(specifier)
            : specifier,
        ),
      );

      if (missingExportSpecifiers.length) {
        let jsExtension = exportSpecifiers.some(specifier =>
          /\.js$/.test(specifier),
        );

        context.report({
          node: context.getSourceCode().ast,
          messageId: 'missingExports',
          fix: buildAddMissingExportsFixer(
            missingExportSpecifiers,
            jsExtension,
          ),
        });
      }
    }

    function buildAddMissingExportsFixer(
      nodesPath: string[],
      jsExtension: boolean,
    ): TSESLint.ReportFixFunction {
      return fixer =>
        fixer.replaceTextRange(
          [0, context.getSourceCode().getText().length],
          `${[
            context.getSourceCode().getText().trimRight(),
            ...nodesPath.map(
              value =>
                `export * from '${removeModuleFileExtension(value)}${
                  jsExtension ? '.js' : ''
                }';`,
            ),
          ]
            .filter(text => !!text)
            .join('\n')}\n`,
        );
    }

    function isStringLiteral(node: TSESTree.Node): node is TSESTree.Literal {
      return (
        (node.type === AST_NODE_TYPES.Literal &&
          typeof node.value === 'string') ||
        node.type === AST_NODE_TYPES.TemplateLiteral
      );
    }

    let infos: ModuleStatementInfo[] = [];

    for (let statement of context.getSourceCode().ast.body) {
      let type: ModuleStatementType;

      switch (statement.type) {
        case AST_NODE_TYPES.ImportDeclaration:
          type = 'import';
          break;

        case AST_NODE_TYPES.ExportNamedDeclaration:
          type = 'export';
          break;

        case AST_NODE_TYPES.ExportAllDeclaration:
          type = statement.exported ? 'export-as' : 'export';
          break;

        default:
          continue;
      }

      let specifier =
        statement.source && isStringLiteral(statement.source)
          ? getModuleSpecifier(context.getSourceCode(), statement.source)
              .replace(/^\'/, '')
              .replace(/\'$/, '')
          : undefined;

      if (!specifier) {
        continue;
      }

      infos.push({
        type,
        statement,
        specifier,
      } as ModuleStatementInfo);
    }

    let fileName = context.getFilename();

    if (INDEX_FILE_REGEX.test(fileName)) {
      validateIndexFile(infos);
    } else {
      for (let info of infos) {
        validateImportOrExport(info);
      }

      if (NAMESPACE_FILE_REGEX.test(fileName)) {
        validateNamespaceFile();
      }
    }

    return {};
  },
});
