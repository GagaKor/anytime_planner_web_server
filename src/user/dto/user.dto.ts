import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
  @Field()
  readonly id?: number;

  readonly username?: string;
}
