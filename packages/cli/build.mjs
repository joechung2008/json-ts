import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["@json-ts/parser"],
  format: "esm",
  outfile: "./dist/index.mjs",
  platform: "node",
  plugins: [nodeExternalsPlugin()],
  sourcemap: true,
  tsconfig: "./tsconfig.json",
}).catch(() => process.exit(1));
