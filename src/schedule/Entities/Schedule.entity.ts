import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "schedules" })
export class Schedule {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ default: false })
  repeatingType: boolean;

  @Field()
  @Column({ nullable: true })
  cycle: number;

  @Field()
  @Column({ nullable: true })
  period: number;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column({ nullable: true })
  endDate: Date;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
