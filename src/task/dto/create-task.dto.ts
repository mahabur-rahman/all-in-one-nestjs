import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}
