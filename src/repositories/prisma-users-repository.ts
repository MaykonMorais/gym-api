import { prisma } from "@/libs/prisma";
import { UserCreateInput } from "../../generated/prisma/models/User";

export class PrismaUsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
