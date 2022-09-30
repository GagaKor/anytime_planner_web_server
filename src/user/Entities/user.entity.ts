import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "users" })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;
}
