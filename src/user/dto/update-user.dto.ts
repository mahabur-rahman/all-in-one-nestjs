import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/auth/schema/user.schema';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
