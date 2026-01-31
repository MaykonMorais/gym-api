import { User } from "generated/prisma/client";
import { UserCreateInput } from "generated/prisma/models";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
