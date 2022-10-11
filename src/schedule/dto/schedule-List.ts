import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ResultData } from "./schdule-ResultData.model";

@ObjectType()
export class SchduleList {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  title: string;

  @Field(type => [ResultData])
  resultData: ResultData[];
}
