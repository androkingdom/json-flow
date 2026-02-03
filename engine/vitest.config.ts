import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@engine",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  test: {
    include: ["test/**/*.test.ts"],
  },
});
