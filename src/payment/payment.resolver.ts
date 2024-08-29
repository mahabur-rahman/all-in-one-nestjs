import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { CreatePaymentType } from './types/create-payment.type';

@Resolver(() => CreatePaymentType)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  // place an order
  @Mutation(() => CreatePaymentType)
  async placeOrder(
    @Args('createPaymentInput') createPaymentInput: PaymentDto,
  ): Promise<CreatePaymentType> {
    return this.paymentService.placeOrder(createPaymentInput);
  }
}
