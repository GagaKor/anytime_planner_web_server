import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResultData {
  @Field({ nullable: true })
  startDate?: Date;
  @Field({ nullable: true })
  endDate?: Date;
}
