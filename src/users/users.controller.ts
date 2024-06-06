import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

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

  // get all users
  @Get()
  async findAll(): Promise<{ users: User[] }> {
    return await this.usersService.findAll();
  }

  // get single user
  @Get(':id')
  async getUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  // update user
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
