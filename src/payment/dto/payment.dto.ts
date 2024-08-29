import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PaymentDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  amount?: string;

  @Field()
  currency: string;

  @Field()
  postCode: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  productId: string;
}
