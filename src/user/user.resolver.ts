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
  async findAllUsers(): Promise<UserType[]> {
    return this.userService.findAllUsers(); // This includes tasks due to relations: ['tasks']
  }
}
