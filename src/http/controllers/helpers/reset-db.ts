import { prisma } from "@/libs/prisma";

export default async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.gym.deleteMany(),
    prisma.checkIn.deleteMany(),
  ]);
};
