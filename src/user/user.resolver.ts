import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from './types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(
    @Args('input') createUserDto: CreateUserDto,
  ): Promise<UserType> {
    return this.userService.createUser(createUserDto);
  }

  @Query(() => [UserType])
  async findAllUsers(
    @Args('skip', { defaultValue: 0 }) skip: number,
    @Args('take', { defaultValue: 100 }) take: number,
  ): Promise<UserType[]> {
    return this.userService.findAllUsers(skip, take);
  }
}
