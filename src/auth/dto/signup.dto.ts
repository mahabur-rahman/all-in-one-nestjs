import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../schema/user.schema';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class SignUpDto {
  @Field()
  @IsNotEmpty({ message: `First name is required` })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: `Invalid email address` })
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: `Password must be at least 6 characters long` })
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole, { message: `Invalid role` })
  role?: UserRole;

  @Field(() => [String], { nullable: true })
  quotes?: string[];
}
