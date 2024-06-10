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

  // follow user

  async followUser(
    currentUsername: string,
    targetUsername: string,
  ): Promise<void> {
    const currentUser = await this.userModel
      .findOne({ userName: currentUsername })
      .exec();

    const targetUser = await this.userModel
      .findOne({ userName: targetUsername })
      .exec();

    if (!targetUser) {
      throw new NotFoundException(
        `User with username '${targetUsername}' not found`,
      );
    }

    if (currentUser.following.includes(targetUser._id)) {
      throw new Error(`You are already following '${targetUsername}'`);
    }

    currentUser.following.push(targetUser._id);

    await currentUser.save();
  }

  // unfollow user
  async unfollowUser(
    currentUsername: string,
    targetUsername: string,
  ): Promise<void> {
    const currentUser = await this.userModel
      .findOne({ userName: currentUsername })
      .exec();
    const targetUser = await this.userModel
      .findOne({ userName: targetUsername })
      .exec();

    if (!targetUser) {
      throw new NotFoundException(
        `User with username '${targetUsername}' not found`,
      );
    }

    // Remove target user ID from following array
    currentUser.following = currentUser.following.filter(
      (userId) => !userId.equals(targetUser._id),
    );

    await currentUser.save();
  }
}
