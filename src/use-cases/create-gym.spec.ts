import { describe, expect, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { GymsRepository } from "@/repositories/gyms-repository";

let gymsRepository: GymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym Rats",
      description: "Gym Sample",
      latitude: 0,
      longitude: 0,
      phone: "+55849182382934",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
