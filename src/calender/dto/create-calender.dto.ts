import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCalendarDto {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  desc?: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  @IsDateString()
  endDate?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  allDay: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  backgroundColor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  borderColor?: string;
}
