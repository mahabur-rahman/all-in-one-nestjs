import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { GmailStatus } from '../schema/gmail.schema';

@InputType()
export class CreateGmailDto {
  @Field(() => String)
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @Field(() => GmailStatus, { defaultValue: GmailStatus.PENDING })
  @IsEnum(GmailStatus, {
    message: 'Status must be either PENDING or VERIFIED.',
  })
  status?: GmailStatus;
}
