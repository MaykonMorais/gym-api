import { CheckIn } from "generated/prisma/client";
import { CheckInUncheckedCreateInput } from "generated/prisma/models";

export interface CheckInsRepository {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>;
}
