import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateCommentDto {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  content: string;

  @Field()
  @IsNotEmpty()
  @IsMongoId()
  quoteRef: string;
}
