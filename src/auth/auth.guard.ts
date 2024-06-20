import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;

    const user: User = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('UnAuthorized user!!!', HttpStatus.UNAUTHORIZED);
    }
  }
}
