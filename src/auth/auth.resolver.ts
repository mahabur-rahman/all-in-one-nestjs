import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './types/user.type';
import { SignUpDto } from './dto/signup.dto';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // signUp user
  @Mutation(() => UserType)
  signUp(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
