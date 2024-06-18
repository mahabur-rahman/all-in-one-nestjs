import { Field, InputType } from '@nestjs/graphql';
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
export class UpdateLessonDto {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  lessonName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  instructor?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  startDate?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  endDate?: string;

  @Field({ nullable: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;

  @Field({ nullable: true })
  @IsEnum(LessonStatus)
  @IsNotEmpty()
  @IsOptional()
  status?: LessonStatus;
}
