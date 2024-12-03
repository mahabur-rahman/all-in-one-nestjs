import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserType extends User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;
}
