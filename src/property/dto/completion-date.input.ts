import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class CompletionDateUpdateInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  quarter?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  year?: string;
}
