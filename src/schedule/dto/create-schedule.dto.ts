import { ArgsType, Field } from "@nestjs/graphql";
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
  @IsString()
  mode: string;

  @Field()
  @IsString()
  repeatingType: string;

  @Field()
  @IsString()
  cycle: string;

  @Field()
  @IsString()
  period: string;

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
