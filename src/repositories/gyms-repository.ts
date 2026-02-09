import { Gym } from "generated/prisma/client";
import { GymCreateInput } from "generated/prisma/models";

export interface GymsRepository {
  create(data: GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
