import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserType extends User {
  @Field()
  username: string;
}
