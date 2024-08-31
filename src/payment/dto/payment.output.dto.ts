import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Payment')
export class PaymentOutput {
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
