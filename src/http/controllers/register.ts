import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { registerUseCase } from "@/use-cases/register";

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

  try {
    await registerUseCase({ name, email, password });
    return response.status(201).send();
  } catch (error) {
    response.status(409).send();
  }
}
