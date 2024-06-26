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

  //  ================================================================
  // ================================================================
  // ================================================================
  // get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().populate('quotes').exec();
    // Populate quotes field.exec();
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

  // qoute added in user module
  async updateUserQuotes(userId: string, quotes: string[]): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { quotes: { $each: quotes } } },
        { new: true, runValidators: true },
      )
      .populate('quotes')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  // get authenticated user profile
  //  ================================================================
  // ================================================================
  // ================================================================
  async getUserProfile(user: User): Promise<User> {
    const foundUser = await this.userModel
      .findById(user._id)
      .populate('quotes')
      .exec();
    if (!foundUser) {
      throw new NotFoundException(`User with id ${user._id} not found`);
    }
    return foundUser;
  }
}
