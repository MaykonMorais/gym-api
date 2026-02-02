import { describe, beforeEach, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it("should be able to create check-in", async () => {
    const { checkIn } = await sut.execute({ gymId: "1293", userId: "109388" });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
