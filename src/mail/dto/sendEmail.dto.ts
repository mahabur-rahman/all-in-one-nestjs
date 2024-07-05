import { InputType, Field } from '@nestjs/graphql';
import { AddressInput } from './address.input';

@InputType()
export class SendEmailDto {
  @Field(() => AddressInput, { nullable: true })
  from?: AddressInput;

  @Field(() => [AddressInput])
  recipients: AddressInput[];

  @Field()
  subject: string;

  @Field()
  html: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => String, { nullable: true })
  placeholderReplacement?: Record<string, string>;
}
