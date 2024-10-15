import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CalendarType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field()
  allDay: boolean;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  borderColor?: string;
}
