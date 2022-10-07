import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { IsDate, IsString } from "class-validator";

@InputType()
export class InputSchedule {
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
}
