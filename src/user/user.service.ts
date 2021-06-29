import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async signUp(user: CreateUserDto) {
    const newMaster = new this.userModel(user);
    return await newMaster.save();
  }

  @Cron('0 */20 23, 0-14 * * *')
  async wakeUp() {
    const res = await this.httpService
      .get('https://ohmink-blog-server.herokuapp.com/posts/getAll')
      .toPromise();

    console.log('Wake up with Cron, res status is ', res.status);
  }
}
