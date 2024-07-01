import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from 'src/auth/types/user.type';

@ObjectType('Quote')
export class QuoteType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field(() => UserType)
  createBy?: UserType;

  @Field(() => [UserType], { defaultValue: [] })
  likes: UserType[];

  @Field(() => [UserType], { defaultValue: [] })
  dislikes: UserType[];

  @Field(() => [String], { nullable: true })
  images?: string[];
}
