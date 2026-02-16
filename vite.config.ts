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
          include: ["./src/use-cases/*.spec.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          include: ["./src/http/controllers/*.spec.ts"],
          setupFiles: [
            "./prisma/prisma-integration-tests/prisma-integration-test.ts",
          ],
        },
      },
    ],
  },
});
