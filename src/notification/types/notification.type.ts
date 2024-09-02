import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from 'src/auth/types/user.type';

@ObjectType('Notification')
export class NotificationType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field(() => UserType, { nullable: true })
  user?: UserType;
}
