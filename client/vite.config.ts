import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@andro.dev/jsonflow-engine",
        replacement: resolve(__dirname, "../engine/src"),
      },
    ],
  },
});
