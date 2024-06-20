import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './types/user.type';
import { SignUpDto } from './dto/signup.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from './schema/user.schema';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from './jwt.guard';
import { RoleGuard, Roles } from './role.guard';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // signUp user
  @Mutation(() => UserType)
  signUp(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // login user
  @Query(() => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    return jwt.sign(payload, 'secretKey', { expiresIn: '2d' });
  }

  // after authentication successful
  @Query(() => String)
  @UseGuards(JwtGuard)
  securedData(@Context('user') user: User): string {
    return 'I am secured data after login' + JSON.stringify(user);
  }

  // role base checking
  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  dataForAdmin(@Context('user') user: User): string {
    return 'Data for admin..' + JSON.stringify(user);
  }

  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.USER))
  dataForUser(@Context('user') user: User): string {
    return 'Data for user..' + JSON.stringify(user);
  }
}
