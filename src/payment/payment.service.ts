import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async getPaymentMessage(): Promise<string> {
    return 'This is a payment message successfully received';
  }
}
