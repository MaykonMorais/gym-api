import { Environment } from "vitest/environments";

import { prisma } from "@/libs/prisma";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

const generateDatabaseUrl = (uuid: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", uuid);

  return url.toString();
};

export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  setup: async () => {
    const id = `test_${randomUUID().replace(/-/g, "")}`;
    const databaseUrl = generateDatabaseUrl(id);

    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma db push");

    return {
      teardown: async () => {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF SCHEMA ${id} CASCADE`);

        await prisma.$disconnect();
      },
    };
  },
};
