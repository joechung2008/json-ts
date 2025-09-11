import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["@koa/router", "@json-ts/parser", "koa", "koa-bodyparser"],
  format: "esm",
  outfile: "./dist/index.js",
  platform: "node",
  plugins: [nodeExternalsPlugin()],
  sourcemap: true,
  tsconfig: "./tsconfig.json",
}).catch(() => process.exit(1));
