import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { PaymentResponseDto } from './dto/paymentResponse.dto';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => PaymentResponseDto)
  async placeOrder(
    @Args('paymentInput') paymentInput: PaymentDto,
  ): Promise<PaymentResponseDto> {
    return await this.paymentService.placeOrder(paymentInput);
  }
}
