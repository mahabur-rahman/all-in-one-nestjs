import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Get, UseGuards, Req } from '@nestjs/common';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }
}
