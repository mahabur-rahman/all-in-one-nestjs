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

  // find user by email for authentication
  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  // get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // get single user :id
  async getSingleUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

    // delete user :id 
}
