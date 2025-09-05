import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { globalIgnores } from "eslint/config";
import path from "node:path";
import tseslint from "typescript-eslint";

/** @typedef {import('eslint').Linter.Config[]} */
export default [
  globalIgnores(["coverage", "dist", "./eslint.config.mjs"]),
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        tsconfigRootDir: path.join(process.cwd(), "../.."),
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
