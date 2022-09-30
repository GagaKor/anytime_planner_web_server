import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/Entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async findAll() {
    return this.user.find();
  }
}
