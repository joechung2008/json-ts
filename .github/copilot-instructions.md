# Copilot Instructions for json-ts

## Project Overview

- **json-ts** is a monorepo for TypeScript-based JSON parsing and CLI tooling.
- Main packages:
  - `packages/parser`: Core JSON parsing logic (see `src/` for modules like `array.ts`, `object.ts`, `value.ts`).
  - `packages/cli`: Command-line interface for parsing and interacting with JSON data.
- All commands should be run from the repository root.

## Developer Workflows

- **Install dependencies:**
  ```sh
  npm install
  ```
- **Build all packages:**
  ```sh
  npm run build
  ```
- **Format code:**
  ```sh
  npm run format
  ```
- **Lint code:**
  ```sh
  npm run lint
  ```
- **Run CLI:**
  ```sh
  npm start
  ```

  - Starts the CLI in TTY mode. Enter input and press Ctrl+D to finish.

## Code Structure & Patterns

- **Parser modules** (`packages/parser/src/`): Each file implements a specific JSON type (e.g., `array.ts`, `object.ts`, `string.ts`).
- **CLI entry point:** `packages/cli/src/index.ts` is the main entry for CLI logic.
- **TypeScript project references** are used for package interdependencies (see `tsconfig.json` files in each package).
- **ESLint** is configured per package (`eslint.config.ts`).

## Conventions & Integration

- **Run all scripts from the repo root** to ensure correct package resolution.
- **No test scripts or test files detected**—if adding tests, follow the monorepo structure and place them in a `__tests__` folder within each package.
- **External reference:** Project is inspired by [json.org](http://json.org).

## Example: Adding a New JSON Type

1. Create a new module in `packages/parser/src/` (e.g., `boolean.ts`).
2. Export parsing logic and types from the new module.
3. Update `index.ts` to include the new type in exports.
4. If CLI support is needed, update `packages/cli/src/index.ts`.

---

For unclear workflows or missing conventions, ask the user for clarification or examples.
