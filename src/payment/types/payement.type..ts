import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Payment')
export class PaymentType {
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
