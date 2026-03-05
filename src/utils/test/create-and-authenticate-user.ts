import { FastifyInstance } from "fastify";
import { hash } from "bcryptjs";
import request from "supertest";

import { prisma } from "@/libs/prisma";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  await request(app.server).post("/users").send({});

  const authResponse = await request(app.server).post("/session").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
