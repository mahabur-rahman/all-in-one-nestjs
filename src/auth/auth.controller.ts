import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   signup User
  @Post('signup')
  signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ user: User; token: string }> {
    return this.authService.signUp(signUpDto);
  }

  // login user
  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<{ user: User; token: string }> {
    return this.authService.login(loginDto);
  }
}
