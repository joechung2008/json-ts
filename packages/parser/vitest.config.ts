import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["dist", "src/index.ts", "*.config.{mjs,ts}"],
    },
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});
