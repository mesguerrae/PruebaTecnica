// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getProfile(user: UserEntity) {
    return user;
  }

  async updateProfile(updateUserDto: UpdateUserDto, user: UserEntity) {
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this.userRepository.findOne({ where: { email, password } });
  }

  async findById(id: number) {
    //return await this.userRepository.findOne(id);
    return await this.userRepository.findOne({
      where: { id: id},
    });
  }
}
