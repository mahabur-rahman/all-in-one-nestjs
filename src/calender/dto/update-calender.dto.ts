import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCalendarDto {
  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;
}
