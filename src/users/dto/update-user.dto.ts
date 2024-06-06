import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly userName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Enter correct email address' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly bio?: string;

  @IsOptional()
  @IsString()
  readonly profileImg?: string;
}
