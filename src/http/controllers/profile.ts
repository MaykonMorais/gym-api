import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, response: FastifyReply) {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const { password: _, ...userWithoutPassword } = user;

  return response.status(200).send(userWithoutPassword);
}
