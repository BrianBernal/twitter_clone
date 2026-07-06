import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { defineConfig, globalIgnores } from 'eslint/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  globalIgnores(['**/dist/**', '**/node_modules/**', '**/*.gen.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: false,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportNamedDeclaration[declaration]',
          message:
            'Export on the same line as a declaration is not allowed. Declare first, then use `export { name }` at the end of the file.',
        },
        {
          selector: 'ExportDefaultDeclaration > FunctionDeclaration',
          message:
            'Default export on the same line as a function declaration is not allowed. Declare the function first, then use `export default name` at the end of the file.',
        },
        {
          selector: 'ExportDefaultDeclaration > ClassDeclaration',
          message:
            'Default export on the same line as a class declaration is not allowed. Declare the class first, then use `export default name` at the end of the file.',
        },
      ],
    },
  },
]);
