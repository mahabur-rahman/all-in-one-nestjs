import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;
}
