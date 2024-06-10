import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getProfileByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ userName: username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
    return user;
  }
}
