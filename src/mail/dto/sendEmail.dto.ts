import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AttachmentDto {
  @Field()
  path: string;

  @Field()
  filename: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  contentDisposition: 'attachment' | 'inline'; // Adjust as needed
}

@InputType()
export class SendEmailDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Field(() => [AttachmentDto], { nullable: true })
  attachments?: AttachmentDto[];
}
