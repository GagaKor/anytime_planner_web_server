import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/Entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async findAll() {
    return this.user.find();
  }
  
  async createUser(createUser: CreateUserDto) {
    try {
      const result = await this.user.save(createUser);
      console.log(result)
      return true;
    } catch(e) { 
      throw new ConflictException('username Conflict')
    }
  }
}
