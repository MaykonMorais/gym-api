import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exists-error";

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
    const usersRepository = new PrismaUsersRepository();
    const registerUserCase = new RegisterUseCase(usersRepository);

    await registerUserCase.execute({ name, email, password });
    return response.status(201).send();
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      response.status(409).send({
        message: error.message,
      });
    }

    response.status(500).send();
  }
}
