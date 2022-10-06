import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Schedule } from "./Entities/Schedule.entity";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UserScheduleDto } from "./dto/user-schedule.dto";

@Resolver(of => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query(() => [Date])
  async findByUser(@Args() userScheduleDto: UserScheduleDto) {
    const schedules = await this.scheduleService.findByUser(userScheduleDto);
    return await this.scheduleService.calculrateSchedule(schedules);
  }

  @Mutation(() => Boolean)
  createSchedule(@Args() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.createSchedule(createScheduleDto);
  }
}
