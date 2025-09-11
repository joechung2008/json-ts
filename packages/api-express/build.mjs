import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["@json-ts/parser", "express"],
  format: "esm",
  outfile: "./dist/index.js",
  platform: "node",
  plugins: [nodeExternalsPlugin()],
  sourcemap: true,
}).catch(() => process.exit(1));
