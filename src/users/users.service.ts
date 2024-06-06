import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // ----------- current user profile -----------
  //   async getProfile(user: any): Promise<User> {
  //     const currentUser = user.toObject();
  //     delete currentUser.password;

  //     return currentUser;
  //   }

  // ----------- current user profile -----------
  async getProfile(user: User): Promise<{ user: Partial<User> }> {
    // Fetch the user from the database and convert to a plain object
    const userProfile = await this.userModel.findById(user._id).lean();

    // Remove the password field
    if (userProfile) {
      delete userProfile.password;
    }

    return { user: userProfile };
  }

  //   get all users
  async findAll(): Promise<{ users: User[] }> {
    const users = await this.userModel.find();

    return { users };
  }

  // get single user
  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  // update user
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Fetch the user from the database
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user fields based on DTO
    if (updateUserDto.userName) {
      user.userName = updateUserDto.userName;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.bio) {
      user.bio = updateUserDto.bio;
    }
    if (updateUserDto.profileImg) {
      user.profileImg = updateUserDto.profileImg;
    }
    if (updateUserDto.password) {
      // Hash the new password before saving
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Save updated user to the database
    await user.save();

    // Return updated user document
    return user;
  }

  // Delete user by ID
  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return deletedUser;
  }
}
