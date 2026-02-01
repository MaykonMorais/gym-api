import { expect, describe, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";

import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Michael Scott",
      email: "michael.scott@dundlermifflin.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    await sut.execute({
      name: "Michael Scott",
      email: "michael.scott@dundlermifflin.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Michael Scott 2",
        email: "michael.scott@dundlermifflin.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
