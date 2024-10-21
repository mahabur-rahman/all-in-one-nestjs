import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import InputType and Field
import { Role } from '../entities/user.entity';

@InputType() // Add this decorator
export class CreateUserDto {
  @Field() // Add GraphQL field decorator
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field() // Add GraphQL field decorator
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Field() // Add GraphQL field decorator
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field() // Add GraphQL field decorator
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field(() => Role) // Add GraphQL field decorator for enum
  @IsEnum(Role) // Validate that the role is one of the Role enum values
  role: Role;
}
