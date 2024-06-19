import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/user.schema'; // Adjust path as necessary

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
