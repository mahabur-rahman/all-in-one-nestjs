import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class TagInput {
  @Field()
  @IsNotEmpty({ message: 'Tag name is required' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Tag color is required' })
  color: string;
}

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field(() => [TagInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagInput) // Needed for class-validator to validate nested objects
  tags?: TagInput[];
}
