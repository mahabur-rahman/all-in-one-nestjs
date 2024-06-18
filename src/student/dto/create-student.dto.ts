import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '../schema/student.schema';

registerEnumType(Gender, {
  name: 'Gender',
});

@InputType()
export class CreateStudentDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  grade?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  addresses?: string;

  @Field(() => Gender)
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
