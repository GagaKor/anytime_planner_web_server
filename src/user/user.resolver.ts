import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/user/Entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  users(@Args("bool") bool: boolean): boolean {
    return bool;
  }

  @Mutation(() => Boolean)
  createUser(@Args() createUserDto: CreateUserDto): boolean {
    console.log(createUserDto);
    return true;
  }
}
