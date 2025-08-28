# Copilot Instructions for json-ts

## Project Overview

- **json-ts** is a monorepo for TypeScript-based JSON parsing and CLI tooling.

- Main packages:
  - `packages/api-express`: API implementation using Express. Provides RESTful endpoints for JSON parsing and related operations.
  - `packages/api-fastify`: API implementation using Fastify. Provides RESTful endpoints for JSON parsing at `/api/v1/parse`.
  - `packages/api-hono`: API implementation using the Hono framework. Provides RESTful endpoints for JSON parsing and related operations.
  - `packages/api-koa`: API implementation using the Koa framework. Provides RESTful endpoints for JSON parsing at `/api/v1/parse`.
  - `packages/api-nestjs`: API implementation using NestJS. Provides RESTful endpoints for JSON parsing at `/api/v1/parse`.
  - `packages/cli`: Command-line interface for parsing and interacting with JSON data.
  - `packages/parser`: Core JSON parsing logic (see `src/` for modules like `array.ts`, `object.ts`, `value.ts`).

- All commands should be run from the repository root.

## Developer Workflows

For usage instructions and developer commands, see [README.md](../README.md).

## Code Structure & Patterns

- **Parser modules** (`packages/parser/src/`): Each file implements a specific JSON type (e.g., `array.ts`, `object.ts`, `string.ts`).
- **CLI entry point:** `packages/cli/src/index.ts` is the main entry for CLI logic.
- **Express API modules** (`packages/api-express/src/`): Main entry point is `src/index.ts`. Implements RESTful endpoints for JSON parsing using the Express framework. The API server listens on http://localhost:3000. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **Fastify API modules** (`packages/api-fastify/src/`): Main entry point is `src/index.ts`. Implements RESTful endpoints for JSON parsing using the Fastify framework. The API server listens on http://localhost:3000; send POST requests to `/api/v1/parse` with `Content-Type: text/plain` to test the parser. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **Hono API modules** (`packages/api-hono/src/`): Main entry point is `src/index.ts`. Implements RESTful endpoints for JSON parsing using the Hono framework. The API server listens on http://localhost:3000. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **Koa API modules** (`packages/api-koa/src/`): Main entry point is `src/index.ts`. Implements RESTful endpoints for JSON parsing using the Koa framework. The API server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **NestJS API modules** (`packages/api-nestjs/src/`): Main entry point is `src/main.ts`. Implements RESTful endpoints for JSON parsing using the NestJS framework. The API server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser. Follows TypeScript conventions and uses its own ESLint configuration (`eslint.config.ts`).
- **TypeScript project references** are used for package interdependencies (see `tsconfig.json` files in each package).
- **ESLint** is configured per package (`eslint.config.ts`).

## Conventions & Integration

- **Run all scripts from the repo root** to ensure correct package resolution.

- **External reference:** Project is inspired by [json.org](http://json.org).

## Copilot Tips

- All API packages (`api-express`, `api-fastify`, `api-hono`, `api-koa`, `api-nestjs`) expose a `/api/v1/parse` POST endpoint for JSON parsing. The request body should be JSON.
- To add new endpoints, create a new controller (NestJS) or route (Express/Fastify/Koa/Hono), and connect it to the relevant parser logic in `packages/parser/src/`.
- Parser modules are organized by JSON type. Extend or modify parsing by editing or adding files in `packages/parser/src/`.
- TypeScript strict mode is enabled; follow type annotations and interfaces for new code.
- Each package has its own ESLint config. Run linting before committing changes.
- Use project references in `tsconfig.json` to link packages. If adding a new package, update workspace and references.
- For new features, prefer placing shared logic in `packages/parser` and exposing it via APIs or CLI.
- When updating API logic, ensure endpoint documentation in README.md is updated.
- Use `.rest` files in `testdata/` with the REST Client extension for manual API testing.
- If unsure about conventions, check existing code for naming, structure, and error handling patterns.

---

For unclear workflows or missing conventions, ask the user for clarification or examples.
