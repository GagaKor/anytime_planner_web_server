import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";

@ArgsType()
export class UpdateUserDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => String)
  @IsString()
  username?: string;
}
