import { Field, ObjectType } from '@nestjs/graphql';
import { PaymentOutput } from './payment.output.dto';

@ObjectType()
export class PaymentResponseDto {
  @Field()
  GatewayPageURL: string;

  @Field(() => PaymentOutput)
  paymentOutput: PaymentOutput;
}
