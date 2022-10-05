import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/user/Entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => User)
  updateUser(@Args() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args() deleteUserDto: DeleteUserDto) {
    const result = await this.userService.deleteUser(deleteUserDto);
    return result.affected > 0;
  }
}
