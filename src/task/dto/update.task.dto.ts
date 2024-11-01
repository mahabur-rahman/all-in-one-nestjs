import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string; // Make title optional for updating
}
