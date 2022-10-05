import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationError } from "apollo-server-express";
import { User } from "src/user/Entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async findAll() {
    return this.user.find();
  }

  async findById(id: number) {
    const user = await this.user.findOne({ where: { id } });
    if (!user) throw new AuthenticationError("Can not found User");
    return user;
  }

  async createUser(createUser: CreateUserDto) {
    try {
      return await this.user.save(createUser);
    } catch (e) {
      throw new ConflictException("username Conflict");
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    let user = await this.findById(updateUserDto.id);
    user.username = updateUserDto.username;
    return this.user.save(user);
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    let user = await this.findById(deleteUserDto.id);
    return await this.user.delete(user.id);
  }
}
