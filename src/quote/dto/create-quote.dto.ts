import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';

// For Ratings filed
@InputType()
class RatingsDto {
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  average: number;

  @Field(() => Number)
  @IsNumber()
  @Min(0)
  count: number;
}

@InputType()
export class CreateQuoteDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  images?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  videos?: string[];

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @Field()
  @IsNotEmpty()
  @IsEnum(['English', 'Spanish', 'French', 'German', 'Other'])
  languages: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsArray()
  features?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  topics?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  level?: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(['Free', 'Paid'])
  price: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(['0-1 hour', '1-3 hours', '3-6 hours', '6+ hours'])
  duration: string;

  // added ratings field
  @Field(() => RatingsDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => RatingsDto)
  ratings?: RatingsDto;
}
