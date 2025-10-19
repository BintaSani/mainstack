/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import history from "connect-history-api-fallback";
import type { Connect } from "vite";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: "spa-fallback",
      configureServer(server) {
        // explicitly cast to the type Connect.NextHandleFunction
        const middleware = history({
          index: "/index.html",
          htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
        }) as unknown as Connect.NextHandleFunction;

        server.middlewares.use(middleware);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/_tests_/**/*.{test,spec,tests_}.?(c|m)[jt]s?(x)"],
    setupFiles: "./setupTests.ts",
    css: true,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
