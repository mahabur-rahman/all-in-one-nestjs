import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { LessonStatus } from '../schema/lesson.schema';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class CreateLessonDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lessonName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  instructor: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  duration: number;

  @Field({ nullable: true })
  @IsEnum(LessonStatus)
  @IsNotEmpty()
  @IsOptional()
  status?: LessonStatus;

  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
