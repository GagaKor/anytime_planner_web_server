import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Schedule } from "./Entities/Schedule.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UserScheduleDto } from "./dto/user-schedule.dto";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedule: Repository<Schedule>,
  ) {}

  async findByUser(userScheduleDto: UserScheduleDto) {
    return await this.schedule.find({ where: { username: userScheduleDto.username } });
  }

  async calculrateSchedule(schedules: Schedule[]) {
    for (const schedule of schedules) {
      let { startDate, endDate, repeat, mode } = schedule;
    }
  }

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    return await this.schedule.save(createScheduleDto);
  }
}
