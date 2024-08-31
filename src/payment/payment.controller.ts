import { Controller, Param, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payment/success/:transactionId')
  async getSuccessPayment(
    @Param('transactionId') transactionId: string,
    @Res() res: Response,
  ) {
    console.log('Payment success for transaction:', transactionId);

    await this.paymentService.successPayment(transactionId);

    // Redirect to the frontend URL
    res.redirect(`http://localhost:3000/payment/success/${transactionId}`);
  }
}
