import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTaskDto, TagInput } from './create-task.dto';

@InputType()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => [TagInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagInput)
  tags?: TagInput[];
}
