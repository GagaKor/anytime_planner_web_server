import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Schedule } from "./Entities/Schedule.entity";
import { ScheduleService } from "./schedule.service";
import { CreateSchedule } from "./dto/create-schedule.dto";
import { UserScheduleDto } from "./dto/user-schedule.dto";
import { SchduleList } from "./dto/schedule-List";

@Resolver(of => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query(() => [SchduleList])
  async schedulefindByUser(@Args() userScheduleDto: UserScheduleDto): Promise<SchduleList[]> {
    const schedules = await this.scheduleService.findByUser(userScheduleDto);
    if (schedules) {
      return await this.scheduleService.calculrateSchedule(schedules);
    }
  }

  @Mutation(() => Schedule)
  createSchedule(@Args() createSchedule: CreateSchedule): Promise<Schedule> {
    return this.scheduleService.createSchedule(createSchedule);
  }
}
