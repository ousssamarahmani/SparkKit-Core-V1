import reactConfig from '@sparkkit/eslint-config/react';

export default [
  {
    // Unmounted concept-prototype code retained temporarily for design reference.
    ignores: [
      'src/App.tsx',
      'src/HonestSite.tsx',
      'src/components/**',
      'src/data/**',
    ],
  },
  ...reactConfig,
];
