import { CheckIn } from "generated/prisma/client";
import { CheckInUncheckedCreateInput } from "generated/prisma/models";

export interface CheckInsRepository {
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
