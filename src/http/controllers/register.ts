import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { prisma } from "@/libs/prisma";

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return response.status(201).send();
}
