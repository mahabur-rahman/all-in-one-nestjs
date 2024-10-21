import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import InputType and Field
import { UserRole } from '../entities/user.entity'; // Import UserRole enum

@InputType() // Add this decorator to mark the class as a GraphQL input type
export class CreateUserDto {
  @Field() // Expose field to GraphQL
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field() // Expose field to GraphQL
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field() // Expose field to GraphQL
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field() // Expose field to GraphQL
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Field(() => UserRole, { nullable: true }) // Expose field to GraphQL
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole; // Optional field
}
