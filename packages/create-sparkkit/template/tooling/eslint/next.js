import nextPlugin from '@next/eslint-plugin-next';

import reactConfig from './react.js';

const nextConfig = [
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react-refresh/only-export-components': 'off',
    },
  },
];

export default nextConfig;
