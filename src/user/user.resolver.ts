import { Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from '../auth/types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
