import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressInput {
  @Field()
  name?: string;

  @Field()
  address: string;
}
