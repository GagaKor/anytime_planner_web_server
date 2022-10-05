import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";

@ArgsType()
export class UserScheduleDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @IsString()
  username: string;
}
