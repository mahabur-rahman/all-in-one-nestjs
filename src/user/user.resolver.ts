import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'; // Import CreateUserDto
import { UserType } from './types/user.type';

@Resolver(() => UserType) // Specify UserType for the resolver
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType) // Define the createUser mutation
  async createUser(
    @Args('input') createUserDto: CreateUserDto,
  ): Promise<UserType> {
    return this.userService.createUser(createUserDto); // Call the service to create a user
  }
}
