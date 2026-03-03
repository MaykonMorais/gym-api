import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { app } from "@/app";
import { prisma } from "@/libs/prisma";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id } = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
