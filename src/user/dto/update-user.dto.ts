import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/auth/schema/user.schema';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsOptional()
  firstName: string;

  @Field()
  @IsOptional()
  lastName: string;

  @Field()
  @IsOptional()
  @IsEmail()
  email: string;

  @Field()
  @IsOptional()
  password: string;

  @Field()
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
