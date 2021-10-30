let plugins = [
  '@mufan/eslint-plugin',
  '@typescript-eslint',
  'import',
  'no-null',
  'react',
  'react-hooks',
];

if (
  require.main &&
  /[\\/]\.vscode(?:-server)?[\\/]extensions[\\/]/.test(require.main.filename)
) {
  plugins.push('only-warn');
}

export const defaultConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins,
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@mufan/empty-line-around-blocks': 'error',
    '@mufan/import-groups': [
      'error',
      {
        groups: [
          {
            name: 'node-core',
            test: '$node-core',
          },
          {
            name: 'node-modules',
            test: '$node-modules',
            sideEffect: true,
          },
          {
            name: 'node-modules',
            test: '$node-modules',
          },
          {
            name: 'project-base',
            test: '^[@\\w]',
            sideEffect: true,
          },
          {
            name: 'project-base',
            test: '^[@\\w]',
          },
          {
            name: 'upper-directory',
            test: '^\\.\\./',
            sideEffect: true,
          },
          {
            name: 'upper-directory',
            test: '^\\.\\./',
          },
          {
            name: 'current-directory',
            test: '^\\./',
            sideEffect: true,
          },
          {
            name: 'current-directory',
            test: '^\\./',
          },
        ],
        ordered: true,
      },
    ],
    '@mufan/import-path-be-smart': 'error',
    '@mufan/import-path-no-parent': 'error',
    '@mufan/import-path-shallowest': 'error',
    '@mufan/import-path-strict-hierarchy': 'off',
    '@mufan/no-empty-constructor': 'error',
    '@mufan/ordered-imports': [
      'error',
      {
        'import-sources-order': 'case-insensitive',
        'named-imports-order': 'lowercase-last',
        'module-source-path': 'full',
      },
    ],
    '@mufan/scoped-modules': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    'accessor-pairs': 'off',
    'array-bracket-newline': 'off',
    'array-bracket-spacing': 'off',
    'array-callback-return': 'off',
    'array-element-newline': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'arrow-spacing': 'off',
    'block-scoped-var': 'off',
    'block-spacing': 'off',
    'brace-style': 'off',
    'callback-return': 'off',
    camelcase: 'off',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'comma-style': 'off',
    complexity: 'off',
    'computed-property-spacing': 'off',
    'consistent-return': 'off',
    'consistent-this': 'off',
    'constructor-super': 'error',
    curly: 'off',
    'default-case': 'off',
    'default-param-last': 'off',
    'dot-location': 'off',
    'dot-notation': 'off',
    'eol-last': 'off',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'for-direction': 'off',
    'func-call-spacing': 'off',
    'func-name-matching': 'off',
    'func-names': 'off',
    'func-style': 'off',
    'function-call-argument-newline': 'off',
    'function-paren-newline': 'off',
    'generator-star-spacing': 'off',
    'getter-return': 'off',
    'global-require': 'off',
    'guard-for-in': 'off',
    'handle-callback-err': 'off',
    'id-blacklist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-deprecated': 'off',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: true,
      },
    ],
    indent: 'off',
    'init-declarations': 'off',
    'jsx-quotes': 'off',
    'key-spacing': 'off',
    'keyword-spacing': 'off',
    'line-comment-position': 'off',
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'max-depth': 'off',
    'max-len': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': 'off',
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'new-cap': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-alert': 'off',
    'no-array-constructor': 'off',
    'no-async-promise-executor': 'off',
    'no-await-in-loop': 'off',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'off',
    'no-caller': 'error',
    'no-case-declarations': 'off',
    'no-class-assign': 'off',
    'no-compare-neg-zero': 'off',
    'no-cond-assign': ['error', 'always'],
    'no-confusing-arrow': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info', 'assert'],
      },
    ],
    'no-const-assign': 'off',
    'no-constant-condition': 'off',
    'no-continue': 'off',
    'no-control-regex': 'off',
    'no-debugger': 'error',
    'no-delete-var': 'off',
    'no-div-regex': 'off',
    'no-dupe-args': 'off',
    'no-dupe-class-members': 'off',
    'no-dupe-keys': 'off',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'off',
    'no-else-return': 'off',
    'no-empty': 'off',
    'no-empty-character-class': 'off',
    'no-empty-function': 'off',
    'no-empty-pattern': 'off',
    'no-eq-null': 'off',
    'no-eval': 'off',
    'no-ex-assign': 'off',
    'no-extend-native': 'off',
    'no-extra-bind': 'off',
    'no-extra-boolean-cast': 'off',
    'no-extra-label': 'off',
    'no-extra-parens': 'off',
    'no-extra-semi': 'off',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'off',
    'no-func-assign': 'off',
    'no-global-assign': 'off',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'off',
    'no-implied-eval': 'off',
    'no-import-assign': 'off',
    'no-inline-comments': 'off',
    'no-inner-declarations': 'off',
    'no-invalid-regexp': 'off',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: false,
      },
    ],
    'no-iterator': 'off',
    'no-label-var': 'off',
    'no-labels': 'off',
    'no-lone-blocks': 'off',
    'no-lonely-if': 'off',
    'no-loop-func': 'off',
    'no-magic-numbers': 'off',
    'no-misleading-character-class': 'off',
    'no-mixed-operators': 'off',
    'no-mixed-requires': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-assign': 'off',
    'no-multi-spaces': 'off',
    'no-multi-str': 'off',
    'no-multiple-empty-lines': 'off',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-new': 'off',
    'no-new-func': 'off',
    'no-new-object': 'off',
    'no-new-require': 'off',
    'no-new-symbol': 'off',
    'no-new-wrappers': 'error',
    'no-null/no-null': 'off',
    'no-obj-calls': 'off',
    'no-octal': 'off',
    'no-octal-escape': 'off',
    'no-param-reassign': 'off',
    'no-path-concat': 'off',
    'no-plusplus': 'off',
    'no-process-env': 'off',
    'no-process-exit': 'off',
    'no-proto': 'off',
    'no-prototype-builtins': 'off',
    'no-redeclare': 'error',
    'no-regex-spaces': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@*/*/bld/*', '*/bld/*', '@*/*/src/*', '*/src/*'],
      },
    ],
    'no-restricted-modules': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-return-await': 'error',
    'no-script-url': 'off',
    'no-self-assign': 'off',
    'no-self-compare': 'off',
    'no-sequences': 'error',
    'no-shadow': 'off',
    'no-shadow-restricted-names': 'off',
    'no-sparse-arrays': 'error',
    'no-sync': 'off',
    'no-tabs': 'off',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-this-before-super': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'off',
    'no-undef': 'off',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'off',
    'no-unmodified-loop-condition': 'off',
    'no-unneeded-ternary': 'off',
    'no-unreachable': 'off',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'off',
    'no-unused-expressions': 'off',
    'no-unused-labels': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-call': 'off',
    'no-useless-catch': 'off',
    'no-useless-computed-key': 'off',
    'no-useless-concat': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'off',
    'no-useless-rename': [
      'error',
      {
        ignoreImport: true,
        ignoreExport: true,
      },
    ],
    'no-useless-return': 'off',
    'no-var': 'error',
    'no-void': 'off',
    'no-warning-comments': 'off',
    'no-whitespace-before-property': 'off',
    'no-with': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': 'off',
    'object-property-newline': 'off',
    'object-shorthand': 'error',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'operator-assignment': 'off',
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'padding-line-between-statements': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': 'off',
    'prefer-named-capture-group': 'off',
    'prefer-numeric-literals': 'off',
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-regex-literals': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'prefer-template': 'error',
    'quote-props': 'off',
    quotes: 'off',
    radix: 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-uses-vars': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'require-atomic-updates': 'off',
    'require-await': 'off',
    'require-unicode-regexp': 'off',
    'require-yield': 'off',
    'rest-spread-spacing': 'off',
    semi: 'off',
    'semi-spacing': 'off',
    'semi-style': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-vars': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'space-infix-ops': 'off',
    'space-unary-ops': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/', '!'],
        exceptions: ['/'],
      },
    ],
    strict: 'off',
    'switch-colon-spacing': 'off',
    'symbol-description': 'off',
    'template-curly-spacing': 'off',
    'template-tag-spacing': 'off',
    'unicode-bom': 'off',
    'use-isnan': [
      'error',
      {
        enforceForSwitchCase: true,
      },
    ],
    'valid-typeof': 'off',
    'vars-on-top': 'off',
    'wrap-iife': 'off',
    'wrap-regex': 'off',
    'yield-star-spacing': 'off',
    yoda: 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@mufan/explicit-return-type': 'error',
        '@mufan/import-path-base-url': 'off',
        '@mufan/strict-key-order': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array',
            readonly: 'array',
          },
        ],
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              '{}': false,
              object: false,
              Object: {
                message:
                  'Avoid using the `Object` type. Did you mean `object`?',
              },
              Boolean: {
                message:
                  'Avoid using the `Boolean` type. Did you mean `boolean`?',
              },
              Number: {
                message:
                  'Avoid using the `Number` type. Did you mean `number`?',
              },
              String: {
                message:
                  'Avoid using the `String` type. Did you mean `string`?',
              },
            },
          },
        ],
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        '@typescript-eslint/func-call-spacing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/index': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'instance-field',
              'public-constructor',
              'protected-constructor',
              'private-constructor',
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
              'static-field',
              'public-static-method',
              'protected-static-method',
              'private-static-method',
            ],
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'class',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
          },
        ],
        '@typescript-eslint/no-array-constructor': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unused-vars-experimental': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/require-array-sort-compare': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/unified-signatures': 'error',
        'no-redeclare': 'off',
      },
    },
  ],
};
