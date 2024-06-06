import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // current user profile
  @Get('profile')
  getProfile(
    @Req()
    req,
  ) {
    return this.usersService.getProfile(req.user);
  }
}
