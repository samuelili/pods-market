import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTypescriptEslint from '@typescript-eslint/eslint-plugin';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    // Flat config: ignore patterns
    ignores: [
      'node_modules',
      'scripts/*',
      'config/*',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      '.DS_Store',
      'package.json',
      'tsconfig.json',
      '**/*.md',
      'build',
      '.eslintrc.cjs',
      'eslint.config.cjs',
      '**/.*', // Ignore all dotfiles (like .gitignore)
    ],
  },
  {
    // Language options (ES Modules, JSX)
    languageOptions: {
      ecmaVersion: 2021, // ES2021 syntax support
      sourceType: 'module',
      globals: {
        window: 'readonly', // For browser-based globals
        document: 'readonly',
        Edit: 'writable',
        console: 'writable',
        _: 'writable',
        $: 'writable',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // Plugins to be used
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
      '@typescript-eslint': pluginTypescriptEslint,
      'react-refresh': pluginReactRefresh,
      import: pluginImport,
    },

    // ESLint rule configurations (extends equivalent in Flat Config)
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginTypescriptEslint.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier formatting as an ESLint rule
    },

    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
