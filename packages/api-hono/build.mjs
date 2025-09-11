import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["@hono/node-server", "@json-ts/parser", "hono"],
  format: "esm",
  outfile: "./dist/index.js",
  platform: "node",
  plugins: [nodeExternalsPlugin()],
  sourcemap: true,
  tsconfig: "./tsconfig.json",
}).catch(() => process.exit(1));
