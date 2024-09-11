import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class QuoteFiltersInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  minRating?: number;

  @Field(() => [String], { nullable: true })
  languages?: string[];

  @Field(() => [String], { nullable: true })
  durations?: string[];

  @Field(() => [String], { nullable: true })
  features?: string[];

  @Field(() => [String], { nullable: true })
  topics?: string[];

  @Field(() => [String], { nullable: true })
  levels?: string[];

  @Field(() => [String], { nullable: true })
  prices?: string[];
}
