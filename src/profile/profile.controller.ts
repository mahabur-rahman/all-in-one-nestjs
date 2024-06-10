import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from 'src/auth/schemas/user.schema';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // get Profile
  @Get(':username')
  async getProfileByUsername(
    @Param('username')
    username: string,
  ): Promise<User> {
    return this.profileService.getProfileByUsername(username);
  }
}
