import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './types/user.type';
import { SignUpDto } from './dto/signup.dto';
import { UseGuards } from '@nestjs/common';
import { User } from './schema/user.schema';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from './utils/auth.guard';
import { LoginResponseType } from './types/login.type';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // signUp user
  @Mutation(() => UserType)
  signUp(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // login user
  @Query(() => LoginResponseType)
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
      // quotes: user.quotes,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      token,
      user,
    };
  }

  // ========================= GOOGLE SIGNIN =========================
  // npm i google-auth-library

  // google signIn
  // @Mutation(() => LoginResponseType)
  // async googleLogin(@Args('token') token: string): Promise<LoginResponseType> {
  //   return this.authService.googleLogin(token);
  // }

  // ========================= FORGOT PASSWORD =========================
  // link generate and sent to mail
  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string): Promise<string> {
    return this.authService.forgotPassword(email);
  }

  // reset password
  @Mutation(() => UserType)
  async resetPassword(
    @Args('token') token: string,
    @Args('userId') userId: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, userId, newPassword);
  }
}
