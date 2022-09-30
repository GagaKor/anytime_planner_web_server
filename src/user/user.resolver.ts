import { Query, Resolver } from "@nestjs/graphql";
import { User } from "src/models/user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async test() {
    console.log("@@@@@@@@@@@@@");
    return "HELLO";
  }
}
