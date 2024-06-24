import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class LoginResponseType {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}
