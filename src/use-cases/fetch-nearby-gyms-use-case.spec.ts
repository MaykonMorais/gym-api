import { describe, it, expect, beforeEach } from "vitest";

import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: GymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      latitude: -5.2077127,
      longitude: -37.3223958,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      latitude: -4.8684811,
      longitude: -37.5114713,
    });

    const { gyms } = await sut.execute({
      userLatitude: -5.2081568,
      userLongitude: -37.3258342,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
