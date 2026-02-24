import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

import { app } from "@/app";

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Amazing gym",
        phone: "84991082345",
        latitude: -5.2077127,
        longitude: -37.3223958,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Typescript Gym",
        description: "Amazing gym",
        phone: "84991082345",
        latitude: -4.8684811,
        longitude: -37.5114713,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -5.2081568,
        longitude: -37.3258342,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    console.log(JSON.stringify(response.body));

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
