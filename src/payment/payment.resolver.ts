import { Resolver, Query } from '@nestjs/graphql';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => String)
  async getPaymentMessage(): Promise<string> {
    return this.paymentService.getPaymentMessage();
  }
}
