import * as path from "node:path";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["coverage", "dist"] },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        tsconfigRootDir: path.join(__dirname, "../.."),
      },
    },
  },
];
