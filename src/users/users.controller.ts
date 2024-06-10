import {
  Body,
  Controller,
  Delete,
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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('users')
// swagger setup for user
@ApiTags('Access user endpoint')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // current user profile
  @Get('profile')
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Get Current User Profile...' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  getProfile(
    @Req()
    req,
  ) {
    return this.usersService.getProfile(req.user);
  }

  // get all users
  @Get()
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Get All Users Successful!' })
  @ApiUnauthorizedResponse({
    description: 'UnAuthorized, login first access this endpoint!',
  })
  async findAll(): Promise<{ users: User[] }> {
    return await this.usersService.findAll();
  }

  // get single user
  @Get(':id')
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Get single user' })
  @ApiUnauthorizedResponse({
    description: 'UnAuthorized, login first access this endpoint!',
  })
  async getUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  // update user
  @Put(':id')
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Modify single user' })
  @ApiUnauthorizedResponse({
    description: 'UnAuthorized, login first access this endpoint!',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  // delete user
  @Delete(':id')
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Delete user success!' })
  @ApiUnauthorizedResponse({
    description: 'UnAuthorized, login first access this endpoint!',
  })
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}
