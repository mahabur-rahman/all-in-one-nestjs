import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NotificationType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;
}
