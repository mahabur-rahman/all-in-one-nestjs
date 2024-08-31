import { Controller, Param, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // if payment is successful
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

  // if payment is failed

  @Post('payment/cancel/:transactionId')
  async paymentCancel(
    @Param('transactionId') transactionId: string,
    @Res() res: Response,
  ) {
    console.log('Payment cancelled for transaction:', transactionId);

    // Update payment status to cancelled (optional)
    await this.paymentService.cancelPayment(transactionId);

    // Redirect to the frontend cancel page
    res.redirect(`http://localhost:3000/payment/failed/${transactionId}`);
  }
}
