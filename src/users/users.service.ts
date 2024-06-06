import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // current user profile
  async getProfile(user: any): Promise<User> {
    const currentUser = user.toObject();
    delete currentUser.password;

    return currentUser;
  }
}
