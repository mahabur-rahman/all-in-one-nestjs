import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { PaymentOutput } from './dto/payment.output.dto';
import * as SSLCommerzPayment from 'sslcommerz-lts';
import { v4 as uuidv4 } from 'uuid';
import { PaymentResponseDto } from './dto/paymentResponse.dto';

@Injectable()
export class PaymentService {
  async placeOrder(paymentDto: PaymentDto): Promise<PaymentResponseDto> {
    const transactionId = uuidv4();
    const paymentOutput: PaymentOutput = { ...paymentDto };

    const store_id = 'test66d0a173afb28';
    const store_passwd = 'test66d0a173afb28@ssl';
    const is_live = false;

    const data = {
      total_amount: paymentOutput.amount,
      currency: paymentOutput.currency,
      tran_id: transactionId,
      success_url: 'http://localhost:3000/success',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      ipn_url: 'http://localhost:3000/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: paymentOutput.name,
      cus_email: 'mahabur.dev@gmail.com',
      cus_add1: paymentOutput.address,
      cus_add2: paymentOutput.address,
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: paymentOutput.postCode,
      cus_country: 'Bangladesh',
      cus_phone: paymentOutput.phone,
      cus_fax: paymentOutput.phone,
      ship_name: paymentOutput.name,
      ship_add1: paymentOutput.address,
      ship_add2: paymentOutput.address,
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: paymentOutput.postCode,
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const apiResponse = await sslcz.init(data);
    const GatewayPageURL = apiResponse.GatewayPageURL;

    console.log(GatewayPageURL);
    return {
      GatewayPageURL,
      paymentOutput,
    };
  }
}
