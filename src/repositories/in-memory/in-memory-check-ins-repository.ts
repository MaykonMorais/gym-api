import dayjs from "dayjs";

import { randomUUID } from "node:crypto";
import { CheckIn } from "generated/prisma/client";

import { CheckInUncheckedCreateInput } from "generated/prisma/models";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfDate = dayjs(date).endOf("date");

    const checkOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfDate);

      return checkin.user_id === userId && isOnSameDate;
    });

    if (!checkOnSameDate) {
      return null;
    }

    return checkOnSameDate;
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
