import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

import { app } from "@/app";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    console.log(">> token", token);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Amazing gym",
        phone: "84991082345",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    console.log(JSON.stringify(response.body));

    expect(response.statusCode).toEqual(201);
  });
});
