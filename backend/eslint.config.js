const { fixupPluginRules } = require('@eslint/compat')
const nodePlugin = require('eslint-plugin-node')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  {
    ignores: ['node_modules/**']
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        exports: 'writable',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly'
      }
    },
    plugins: {
      node: fixupPluginRules(nodePlugin),
      prettier: fixupPluginRules(prettierPlugin)
    },
    rules: {
      'no-console': 'warn',
      'node/exports-style': ['error', 'module.exports'],
      'node/file-extension-in-import': ['error', 'always'],
      'node/prefer-global/buffer': ['error', 'always'],
      'node/prefer-global/console': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
      'node/prefer-global/url-search-params': ['error', 'always'],
      'node/prefer-global/url': ['error', 'always'],
      'node/prefer-promises/dns': 'error',
      'node/prefer-promises/fs': 'error',
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          endOfLine: 'lf',
          printWidth: 160,
          semi: false,
          singleQuote: true,
          trailingComma: 'none'
        }
      ]
    }
  }
]
