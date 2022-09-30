import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/user/Entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() : Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => Boolean)
  createUser(@Args() createUserDto: CreateUserDto): Promise<boolean> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }
}
