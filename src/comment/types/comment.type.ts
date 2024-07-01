import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/auth/types/user.type';
import { QuoteType } from 'src/quote/types/quote.type';

@ObjectType('Comment')
export class CommentType {
  @Field(() => ID)
  _id: string;

  @Field()
  content: string;

  @Field(() => [UserType], { defaultValue: [] })
  commentedBy: [UserType];

  @Field(() => QuoteType)
  quoteRef: QuoteType;

  // reply comment
  @Field(() => [ReplyType], { defaultValue: [] })
  replies: ReplyType[];
}

// reply comment

@ObjectType('Reply')
export class ReplyType {
  @Field()
  replyContent: string;

  @Field(() => UserType)
  repliedBy: UserType;
}
