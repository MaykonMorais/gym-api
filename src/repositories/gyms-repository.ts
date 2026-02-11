import { Gym } from "generated/prisma/client";
import { GymCreateInput } from "generated/prisma/models";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: GymCreateInput): Promise<Gym>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
