import { Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payment/success/:transactionId')
  async getSuccessPayment(@Param('transactionId') transactionId: string) {
    console.log('Payment success for transaction:', transactionId);

    return await this.paymentService.successPayment(transactionId);
  }
}
