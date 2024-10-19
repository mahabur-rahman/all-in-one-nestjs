import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCalendarDto {
  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  allDay?: boolean;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  borderColor?: string;
}
