import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Schedule } from "./Entities/Schedule.entity";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UserScheduleDto } from "./dto/user-schedule.dto";

@Resolver(of => Schedule)
export class ScheduleResolver {
  constructor(private readonly cheduleService: ScheduleService) {}

  @Query(() => [Date])
  findByUser(@Args() userScheduleDto: UserScheduleDto) {
    return;
  }

  @Mutation(() => Boolean)
  createSchedule(@Args() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.cheduleService.createSchedule(createScheduleDto);
  }
}
