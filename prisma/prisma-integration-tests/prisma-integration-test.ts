import { Environment } from "vitest/environments";

import { prisma } from "@/libs/prisma";
import { execSync } from "node:child_process";

export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  setup: async () => {
    execSync("npx prisma db push");

    return {
      teardown: async () => {
        await prisma.$disconnect();
      },
    };
  },
};
