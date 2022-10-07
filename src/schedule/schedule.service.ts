import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Schedule } from "./Entities/Schedule.entity";
import { InputSchedule } from "./dto/schedule.input";
import { UserScheduleDto } from "./dto/user-schedule.dto";
import { SchduleList } from "./dto/schedule-List";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedule: Repository<Schedule>,
  ) {}

  async findByUser(userScheduleDto: UserScheduleDto) {
    return await this.schedule.find({ where: { username: userScheduleDto.username } });
  }

  async calculrateSchedule(schedules: Schedule[]): Promise<SchduleList[]> {
    let result = [];
    for (let schedule of schedules) {
      let { id, username, startDate, endDate, repeatingType, cycle, title } = schedule;
      let cycletime = cycle - 1;
      let startEndArr = [];
      let resultDate = {};
      while (startDate < endDate && repeatingType) {
        if (cycletime > 0) {
          if (cycletime === cycle - 1) {
            resultDate["startDate"] = new Date(startDate);
          }
          cycletime--;
        } else {
          resultDate["endDate"] = new Date(startDate);
          startEndArr.push(resultDate);
          cycletime = cycle - 1;
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      result.push({ id, username, title, resultData: startEndArr });
    }
    return result;
  }

  async createSchedule(inputSchedule: InputSchedule): Promise<Schedule> {
    return await this.schedule.save(inputSchedule);
  }
}
