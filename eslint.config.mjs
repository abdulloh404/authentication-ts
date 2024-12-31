import nx from '@nx/eslint-plugin';
const { configs } = nx;

export default [
  ...configs['flat/base'],
  ...configs['flat/typescript'],
  ...configs['flat/javascript'],
  {
    ignores: ['**/tmp', '**/dist', '**/migrations', '**/node_modules'],
  },
  {
    files: ['src/**/*.ts', 'e2e/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'warn',
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-confusing-void-expression': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unnecessary-type-parameters': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
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
