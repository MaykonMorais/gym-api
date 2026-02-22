import resetDb from "./reset-db";
import { afterAll } from "vitest";

afterAll(async () => {
  await resetDb();
});
