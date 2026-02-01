import { prisma } from "@/libs/prisma";
import { UserCreateInput } from "../../../generated/prisma/models/User";
import { UsersRepository } from "../users-repository";
import { User } from "generated/prisma/client";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
