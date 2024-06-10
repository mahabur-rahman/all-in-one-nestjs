import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email.' })
  // swagger setup
  @ApiProperty({
    description: 'Provide user email',
    required: true,
    type: String,
  })
  readonly email: string;

  @IsNotEmpty()
  // swagger setup
  @ApiProperty({
    description: 'Provide password',
    required: true,
    type: String,
  })
  readonly password: string;
}
