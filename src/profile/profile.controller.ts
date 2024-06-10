import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from 'src/auth/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // get Profile using dynamic userName
  @Get(':username')
  async getProfileByUsername(
    @Param('username')
    username: string,
  ): Promise<User> {
    console.log(username);
    return this.profileService.getProfileByUsername(username);
  }

  // follow user

  @Post(':username/follow')
  @UseGuards(AuthGuard())
  async followUser(
    @Param('username') username: string,
    @Req() req: any,
  ): Promise<void> {
    const currentUsername = (req.user as any).userName;
    await this.profileService.followUser(currentUsername, username);
  }

  // unfollow user
  @Delete(':username/unfollow')
  @UseGuards(AuthGuard())
  async unfollowUser(
    @Param('username') username: string,
    @Req() req: any,
  ): Promise<void> {
    const currentUsername = (req.user as any).userName; // Assuming user data is stored in 'userName' property

    await this.profileService.unfollowUser(currentUsername, username);
  }
}
