import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role, User } from '../entities/user.entity';

@ObjectType() // Use ObjectType for GraphQL output type
export class UserType extends User {
  @Field(() => ID) // Specify that id is an ID type
  id: string;

  @Field() // Make sure to decorate with @Field()
  email: string;

  @Field() // Make sure to decorate with @Field()
  firstName: string;

  @Field() // Make sure to decorate with @Field()
  lastName: string;

  @Field() // Make sure to decorate with @Field()
  isActive: boolean;

  @Field(() => Role) // Specify that role is of Role enum type
  role: Role;
}
