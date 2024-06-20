import { Query, Resolver, Context, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserRole } from 'src/auth/schema/user.schema';
import { JwtGuard } from 'src/auth/utils/jwt.guard';
import { RoleGuard } from 'src/auth/utils/role.guard';
import { UserType } from 'src/auth/types/user.type';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
  //  ================================================================
  // ================================================================
  // ================================================================
  // Get All users
  @Query(() => [UserType])
  // @UseGuards(JwtGuard, new RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  // get single user :id
  @Query(() => UserType)
  @UseGuards(JwtGuard)
  async getSingleUserById(@Args('id') id: string) {
    return await this.userService.getSingleUserById(id);
  }

  // delete user :id
  @Mutation(() => UserType)
  @UseGuards(JwtGuard)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
  // update user :id
  @Mutation(() => UserType)
  @UseGuards(JwtGuard)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // qoute added in user module
  @Mutation(() => UserType)
  @UseGuards(JwtGuard)
  async updateUserQuotes(
    @Args('userId') userId: string,
    @Args('quotes', { type: () => [String] }) quotes: string[],
  ) {
    return await this.userService.updateUserQuotes(userId, quotes);
  }
}
