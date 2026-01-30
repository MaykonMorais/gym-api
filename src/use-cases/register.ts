import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
