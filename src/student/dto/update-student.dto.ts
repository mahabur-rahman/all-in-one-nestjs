import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateStudentDto {
  @Field()
  @IsString()
  @IsOptional()
  firstName: string;

  @Field()
  @IsString()
  @IsOptional()
  lastName: string;
}
