import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role, User } from '../entities/user.entity';

@ObjectType()
export class UserType extends User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;

  @Field(() => Role)
  role: Role;
}
