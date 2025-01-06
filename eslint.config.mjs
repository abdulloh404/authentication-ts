import nx from '@nx/eslint-plugin';
const { configs } = nx;

export default [
  ...configs['flat/base'],
  ...configs['flat/typescript'],
  ...configs['flat/javascript'],
  // tseslint.configs.strictTypeChecked,
  // tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      'tmp/**/*',
      'tmp/**/*',
      'dist/**/*',
      'migrations/**/*',
      'node_modules/**/*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.js', '**/*.cjs', '**/*.mjs'],
    /**
     * See https://typescript-eslint.io
     * Shared settings for all the projects below. See https://typescript-eslint.io/rules
     */
    rules: {
      // '@typescript-eslint/no-duplicate-enum-values': 'error',
      // '@typescript-eslint/no-duplicate-type-constituents': 'error',
      // '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      // '@typescript-eslint/explicit-member-accessibility': 'warn',
      // '@typescript-eslint/no-unused-expressions': 'warn',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-confusing-void-expression': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unnecessary-type-parameters': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,

      'comma-dangle': ['warn', 'always-multiline'],
      'no-console': 1,
      'no-extra-boolean-cast': 0,
      indent: ['warn', 2],
      quotes: ['warn', 'single'],
      'prefer-const': 'warn',
    },
  },
];
