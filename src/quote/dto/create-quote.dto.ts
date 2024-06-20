import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuoteDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  // @Field()
  // @IsEmpty({ message: `You can not pass user ID!` })
  // createBy: string;
}
