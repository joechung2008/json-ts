/** @type {import('tsup').Options} */
export default {
  dts: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  sourcemap: true,
  tsconfig: "tsconfig.json",
};
