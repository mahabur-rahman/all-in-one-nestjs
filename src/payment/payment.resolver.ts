import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { PaymentType } from './types/create-payment.type';

@Resolver(() => PaymentType)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => PaymentType)
  async placeOrder(@Args('paymentInput') paymentInput: PaymentDto) {
    return await this.paymentService.placeOrder(paymentInput);
  }
}
