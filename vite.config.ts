import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          dir: "./src/use-cases",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          pool: "forks",
          dir: "./src/http/controllers",
          setupFiles: ["./src/http/controllers/helpers/setup.ts"],
          environment:
            "./prisma/prisma-integration-tests/prisma-integration-test.ts",
        },
      },
    ],
  },
});
