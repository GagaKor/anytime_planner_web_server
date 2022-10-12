import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Schedule } from "./Entities/Schedule.entity";
import { CreateSchedule } from "./dto/create-schedule.dto";
import { UserScheduleDto } from "./dto/user-schedule.dto";
import { SchduleList } from "./dto/schedule-List";
import { ResultData } from "./dto/schdule-ResultData";
import { UserService } from "./../user/user.service";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedule: Repository<Schedule>,
    private readonly userService: UserService,
  ) {}

  async findByUser(userScheduleDto: UserScheduleDto) {
    const user = await this.userService.findByUsername(userScheduleDto.username);
    return await this.schedule.find({ where: { username: user.username } });
  }

  /**
   * user 정보 바탕으로 schedule[] 받아 schedule 별 주기 계산하여 리턴
   */
  async calculrateSchedule(schedules: Schedule[]): Promise<SchduleList[]> {
    let result = [];
    for (let schedule of schedules) {
      let { id, username, startDate, endDate, repeatingType, cycle, title } = schedule;
      console.log();
      let cycletime = cycle - 1;
      let startEndArr = [];
      let resultDate: ResultData = { startDate: null, endDate: null };
      while (startDate < endDate && repeatingType) {
        if (cycletime > 0) {
          if (cycletime === cycle - 1) {
            // cycle 시작 값 입력
            resultDate.startDate = new Date(startDate);
          }
          cycletime--;
        } else {
          if (cycle === 1) {
            //cycle 1로 설정할 시 1일 단위 들어감
            resultDate.startDate = new Date(startDate);
          }
          resultDate.endDate = new Date(startDate);
          // 시작일 종료일 저장
          startEndArr.push(resultDate);
          // cycle 초기화
          cycletime = cycle - 1;
          // resultDate 초기화
          resultDate = { startDate: null, endDate: null };
        }
        startDate.setDate(startDate.getDate() + 1);
      }
      const resultData: ResultData[] = startEndArr;
      const scheduleList: SchduleList = { id, username, title, resultData };
      result.push(scheduleList);
    }
    const scheduleLists: SchduleList[] = result;
    return scheduleLists;
  }

  async createSchedule(createSchedule: CreateSchedule): Promise<Schedule> {
    await this.userService.findByUsername(createSchedule.username);
    if (createSchedule.cycle < createSchedule.period) throw new BadRequestException("period cannot be greater than cycle");
    return await this.schedule.save(createSchedule);
  }
}
