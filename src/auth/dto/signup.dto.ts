import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  // swagger setup
  @ApiProperty({
    description: 'Provide user name',
    required: true,
    type: String,
  })
  readonly userName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address.' })
  // swagger setup
  @ApiProperty({
    description: 'Provide valid email',
    required: true,
    type: String,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  // swagger setup
  @ApiProperty({
    description: 'Provide 6 characters password',
    required: true,
    type: String,
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  // swagger setup
  @ApiProperty({
    description: 'write your biography...',
    required: false,
    type: String,
  })
  readonly bio?: string;

  @IsOptional()
  @IsString()
  // swagger setup
  @ApiProperty({
    description: 'Profile image is optional, given valid url!',
    required: false,
    type: String,
  })
  readonly profileImg?: string;
}
