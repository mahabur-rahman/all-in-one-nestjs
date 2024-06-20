import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/user.schema'; // Adjust path as necessary
import { UpdateUserDto } from './dto/update-user.dto';

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

  //   delete user :id
  async deleteUser(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // update user :id
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateUserDto },
        { new: true, runValidators: true },
      )
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
