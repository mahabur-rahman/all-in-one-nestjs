import { Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserRole } from 'src/auth/schema/user.schema';
import { JwtGuard } from 'src/auth/utils/jwt.guard';
import { RoleGuard } from 'src/auth/utils/role.guard';
import { UserType } from 'src/auth/types/user.type';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  // secured data after login give in headers token to access
  @Query(() => String)
  @UseGuards(JwtGuard)
  securedData(@Context('user') user: any): string {
    return `I am secured data after login for user:` + JSON.stringify(user);
  }

  // role for admin
  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(UserRole.ADMIN))
  dataForAdmin(@Context('user') user: any): string {
    return `Data for admin: ` + JSON.stringify(user);
  }

  // role for user
  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(UserRole.USER))
  dataForUser(@Context('user') user: any): string {
    return `Data for user: ` + JSON.stringify(user);
  }

  // Get All users
  @Query(() => [UserType])
  @UseGuards(JwtGuard, new RoleGuard(UserRole.ADMIN))
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
