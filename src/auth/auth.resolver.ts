import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './types/user.type';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // signUp user
  @Mutation(() => UserType)
  signUp(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Mutation(() => String)
  async login(@Args('loginDto') loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return token;
  }
}
