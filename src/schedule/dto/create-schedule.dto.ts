import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsDate, IsString } from "class-validator";

@ArgsType()
export class CreateScheduleDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  title: string;

  @Field()
  repeatingType: boolean;

  @Field(() => Int)
  cycle: number;

  @Field(() => Int)
  period: number;

  @Field()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
