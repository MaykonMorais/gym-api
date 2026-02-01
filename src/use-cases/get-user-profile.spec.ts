import { describe, beforeEach, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      id: "user-profile-1",
      name: "Dwight Schrute",
      email: "dwight.schrute@dundlermifflin.com",
      password: "123456",
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Dwight Schrute");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({ userId: "non-existing-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
