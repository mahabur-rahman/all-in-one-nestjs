import { Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/auth/schema/user.schema';

@Resolver(() => String)
export class UserResolver {
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
}
