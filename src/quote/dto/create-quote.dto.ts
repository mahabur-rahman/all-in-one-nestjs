import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuoteDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsMongoId()
  createBy: string;
}
