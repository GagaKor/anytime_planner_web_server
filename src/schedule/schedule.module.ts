import { Module } from "@nestjs/common";
import { ScheduleResolver } from "./schedule.resolver";
import { ScheduleService } from "./schedule.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./Entities/Schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
