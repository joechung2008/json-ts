import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

build({
  bundle: true,
  entryPoints: ["src/main.ts"],
  external: [
    "@nestjs/common",
    "@nestjs/core",
    "@nestjs/platform-fastify",
    "@json-ts/parser",
    "fastify",
    "reflect-metadata",
    "rxjs",
  ],
  format: "esm",
  outfile: "./dist/main.js",
  platform: "node",
  plugins: [nodeExternalsPlugin()],
  sourcemap: true,
}).catch(() => process.exit(1));
