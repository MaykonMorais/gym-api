import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

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
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
    return response.status(201).send();
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      response.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
}
