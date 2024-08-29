import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { CreatePaymentType } from './types/create-payment.type';

@Injectable()
export class PaymentService {
  private readonly storeId = process.env.STORE_ID;
  private readonly storePassword = process.env.STORE_PASSWORD;
  private readonly isLive = process.env.IS_LIVE;

  // place an order
  async placeOrder(paymentDto: PaymentDto): Promise<CreatePaymentType> {
    const paymentData: CreatePaymentType = {
      ...paymentDto,
    };

    console.log('Payment Data:', paymentData);

    return paymentData;
  }
}
