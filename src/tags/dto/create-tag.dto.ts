import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  // swagger setup
  @ApiProperty({
    description: 'Write a new tag',
    required: true,
    type: String,
  })
  readonly tagName: string;
}
