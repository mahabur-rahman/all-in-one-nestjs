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
}
