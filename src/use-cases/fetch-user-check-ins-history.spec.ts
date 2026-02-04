import { describe, it, expect, beforeEach } from "vitest";
import { FetchUserCheckInsHistory } from "./fetch-user-check-ins-history";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

let checkInsRepository: CheckInsRepository;
let sut: FetchUserCheckInsHistory;

describe("Fetch User Check-ins History Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistory(checkInsRepository);
  });

  it("should be able to fetch check-ins by user", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "Javascript Gym",
    });

    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "Javascript Gym",
    });

    const { checkIns } = await sut.execute({ userId: "user-01", page: 1 });

    expect(checkIns).length(2);

    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: "user-01" }),
      expect.objectContaining({ user_id: "user-01" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: `user-01`,
        gym_id: `gym-${i}`,
      });
    }

    const { checkIns } = await sut.execute({ userId: "user-01", page: 2 });

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
