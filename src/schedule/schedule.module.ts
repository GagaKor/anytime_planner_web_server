import { Module } from "@nestjs/common";
import { ScheduleResolver } from "./schedule.resolver";
import { ScheduleService } from "./schedule.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./Entities/Schedule.entity";
import { DateScalar } from "src/scalar/date.scalar";
import { UserModule } from "./../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), UserModule],
  providers: [ScheduleResolver, ScheduleService, DateScalar],
})
export class ScheduleModule {}
