import baseConfig from '@sparkkit/eslint-config/base';

export default [
  {
    ignores: ['src/generated/**'],
  },
  ...baseConfig,
];
