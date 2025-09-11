# json-ts

## License

MIT

## Reference

[json.org](http://json.org)

## Build Packages

```sh
pnpm run build
```

## Format Packages

```sh
pnpm run format
```

## Lint Packages

```sh
pnpm run lint
```

## API Server Port Configuration

**Note:** All API servers listen on the port specified by the `PORT` environment variable. If `PORT` is not set, they default to port 3000. Use `process.env.PORT` for proper operation in most hosting environments.

## Run the Express API

```sh
pnpm run start:api-express
```

This will start the Express API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

## Run the Fastify API

```sh
pnpm run start:api-fastify
```

This will start the Fastify API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` with `Content-Type: text/plain` to test the parser.

## Run the Hapi API

```sh
pnpm run start:api-hapi
```

This will start the Hapi API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

## Run the Hono API

```sh
pnpm run start:api-hono
```

This will start the Hono API workspace. The server listens on http://localhost:3000; send POST requests to this endpoint to test the parser.

## Run the Koa API

```sh
pnpm run start:api-koa
```

This will start the Koa API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

## Run the NestJS API

```sh
pnpm run start:api-nestjs
```

This will start the NestJS API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

## Run the CLI

```sh
pnpm run start:cli
```

This will start the CLI workspace. In TTY mode, enter input and press Ctrl+D to finish.

## Notes

- All commands should be run from the repository root.
- Ensure dependencies are installed with `pnpm install` before running any commands.

## Testing APIs with REST Client (VS Code Extension)

To send test requests to the APIs using the REST Client extension:

1. Install the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in VS Code.
2. Open any `.rest` file in the `testdata/` directory.
3. Click the "Send Request" button above a request to execute it.
4. The response will appear in a new VS Code pane.

The `.rest` files contain sample requests for all supported APIs.
