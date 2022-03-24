import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum } from './roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create({
      ...dto,
      roles: [RolesEnum.USER],
    });
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({}).exec();
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email }).exec();
  }
}
