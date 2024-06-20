import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Quote')
export class QuoteType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  createBy?: string;
}
