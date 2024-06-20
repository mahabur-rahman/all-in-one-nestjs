import { IsOptional, IsString, IsMongoId } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateQuoteDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  createBy?: string;
}
