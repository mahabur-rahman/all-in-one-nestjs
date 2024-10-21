import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from './types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<UserType> {
    return this.userService.createUser(createUserDto);
  }
}
