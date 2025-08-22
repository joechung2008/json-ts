# Copilot Instructions for json-ts

## Project Overview

- **json-ts** is a monorepo for TypeScript-based JSON parsing and CLI tooling.

- Main packages:
  - `packages/api-express`: API implementation using Express. Provides RESTful endpoints for JSON parsing and related operations.
  - `packages/api-hono`: API implementation using the Hono framework. Provides RESTful endpoints for JSON parsing and related operations.
  - `packages/cli`: Command-line interface for parsing and interacting with JSON data.
  - `packages/parser`: Core JSON parsing logic (see `src/` for modules like `array.ts`, `object.ts`, `value.ts`).

- All commands should be run from the repository root.

## Developer Workflows

- **Install dependencies:**

```sh
pnpm install
```

- **Build all packages:**

```sh
pnpm run build
```

- **Format code:**

```sh
pnpm run format
```

- **Lint code:**

```sh
pnpm run lint
```

- **Run Express API:**

```sh
pnpm run start:api-express
```

Starts the Express API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

**Run Hono API:**

```sh
pnpm run start:api-hono
```

Starts the API workspace using Hono. Provides RESTful endpoints for JSON parsing.

- **Run CLI:**

```sh
pnpm run start:cli
```

Starts the CLI workspace in TTY mode. Enter input and press Ctrl+D to finish.

## Code Structure & Patterns

- **Parser modules** (`packages/parser/src/`): Each file implements a specific JSON type (e.g., `array.ts`, `object.ts`, `string.ts`).
- **CLI entry point:** `packages/cli/src/index.ts` is the main entry for CLI logic.
- **Express API modules** (`packages/api-express/src/`): Main entry point is `src/index.ts`. Implements RESTful endpoints for JSON parsing using the Express framework. The API server listens on http://localhost:3000. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **Hono API modules** (`packages/api-hono/src/`): Main entry point is `src/index.ts`. Implements RESTful endpoints for JSON parsing using the Hono framework. The API server listens on http://localhost:3000. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **TypeScript project references** are used for package interdependencies (see `tsconfig.json` files in each package).
- **ESLint** is configured per package (`eslint.config.ts`).

## Conventions & Integration

- **Run all scripts from the repo root** to ensure correct package resolution.

- **No test scripts or test files detected**—if adding tests, follow the monorepo structure and place them in a `__tests__` folder within each package.

- **External reference:** Project is inspired by [json.org](http://json.org).

---

For unclear workflows or missing conventions, ask the user for clarification or examples.
