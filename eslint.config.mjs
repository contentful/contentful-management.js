// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['test/output-integration/**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        createClient: true,
      },
    },
  },
  // Library
  {
    files: ['lib/**/*'],
    rules: {
      // Things we probably should fix at some point
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      // Things we won't allow
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowDestructuring: true, // Allow `const { props, state } = this`; false by default
          allowedNames: ['self'], // Allow `const self = this`; `[]` by default
        },
      ],
    },
  },
  // Dist
  {
    files: ['dist/cjs/**/*'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Tests
  {
    files: ['test/**/*'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  }
)
