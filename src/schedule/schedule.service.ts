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
    let result = [];
    for (let schedule of schedules) {
      let { startDate, endDate, repeatingType, cycle, title } = schedule;
      let cycletime = cycle - 1;
      let startEndArr = [];
      let resultDate = { startDate: null, endDate: null };
      while (startDate < endDate && repeatingType) {
        if (cycletime > 0) {
          if (cycletime === cycle - 1) {
            resultDate.startDate = new Date(startDate);
          }
          cycletime--;
        } else {
          resultDate.endDate = new Date(startDate);
          startEndArr.push(resultDate);
          cycletime = cycle - 1;
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      result.push({ title, resultData: startEndArr });
    }
    return result;
  }

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    return await this.schedule.save(createScheduleDto);
  }
}
