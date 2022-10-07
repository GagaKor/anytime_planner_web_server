import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResultData {
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
}
