import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async signUp(user: CreateUserDto) {
    const newMaster = new this.userModel(user);
    return await newMaster.save();
  }
}
