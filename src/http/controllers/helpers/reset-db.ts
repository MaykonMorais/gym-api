import { prisma } from "@/libs/prisma";

export default async () => {
  await prisma.$transaction([
    prisma.checkIn.deleteMany(),
    prisma.gym.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
