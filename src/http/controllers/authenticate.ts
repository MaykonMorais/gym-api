import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUsecase = new AuthenticateUseCase(usersRepository);

    await authenticateUsecase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message });
    }

    throw error;
  }

  return response.status(200).send();
}
