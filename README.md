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

## Run the Hono API

```sh
pnpm run start:api-hono
```

This will start the Hono API workspace. The server listens on http://localhost:3000; send POST requests to this endpoint to test the parser.

## Run the Express API

```sh
pnpm run start:api-express
```

This will start the Express API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

## Run the Koa API

```sh
pnpm run start:api-koa
```

This will start the Koa API workspace. The server listens on http://localhost:3000; send POST requests to `/api/v1/parse` to test the parser.

## Run the CLI

```sh
pnpm run start:cli
```

This will start the CLI workspace. In TTY mode, enter input and press Ctrl+D to finish.

## Notes

- All commands should be run from the repository root.
- Ensure dependencies are installed with `pnpm install` before running any commands.
