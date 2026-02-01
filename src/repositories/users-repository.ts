import { User } from "generated/prisma/client";
import { UserCreateInput } from "generated/prisma/models/User";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: UserCreateInput): Promise<User>;
}
