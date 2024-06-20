import { Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/role.guard';

@Resolver(() => String)
export class UserResolver {
  @Query(() => String)
  @UseGuards(JwtGuard)
  securedData(@Context('user') user: any): string {
    return `I am secured data after login for user:` + JSON.stringify(user);
  }

  // role for admin
  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  dataForAdmin(@Context('user') user: any): string {
    return `Data for admin: ` + JSON.stringify(user);
  }

  // role for user
  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.USER))
  dataForUser(@Context('user') user: any): string {
    return `Data for user: ` + JSON.stringify(user);
  }
}
