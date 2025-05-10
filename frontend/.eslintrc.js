module.exports = {
  extends: ['eslint:recommended', 'react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['prettier', 'perfectionist'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-console': 'warn',
    'perfectionist/sort-imports': [
      'error',
      {
        newlinesBetween: 'never',
        type: 'natural',
        order: 'asc'
      }
    ],
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
