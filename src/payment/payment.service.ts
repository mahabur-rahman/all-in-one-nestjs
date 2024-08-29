import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentDto } from './dto/payment.dto';
import * as SSLCommerzPayment from 'sslcommerz-lts';

@Injectable()
export class PaymentService {
  async placeOrder(paymentDto: PaymentDto) {
    const transactionId = uuidv4();
    const paymentData = { ...paymentDto };

    const store_id = 'test66d0a173afb28';
    const store_passwd = 'test66d0a173afb28@ssl';
    const is_live = false;

    const data = {
      total_amount: paymentData.amount,
      currency: paymentData.currency,
      tran_id: transactionId,
      success_url: 'http://localhost:3000/success',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      ipn_url: 'http://localhost:3000/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: paymentData.name,
      cus_email: 'mahabur.dev@gmail.com',
      cus_add1: paymentData.address,
      cus_add2: paymentData.address,
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: paymentData.postCode,
      cus_country: 'Bangladesh',
      cus_phone: paymentData.phone,
      cus_fax: paymentData.phone,
      ship_name: paymentData.name,
      ship_add1: paymentData.address,
      ship_add2: paymentData.address,
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: paymentData.postCode,
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    // console.log(sslcz);

    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      const GatewayPageURL = apiResponse.GatewayPageURL;

      console.log('Redirecting to: ', GatewayPageURL);
    });
  }
}
