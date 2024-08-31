import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { PaymentOutput } from './dto/payment.output.dto';
import * as SSLCommerzPayment from 'sslcommerz-lts';
import { v4 as uuidv4 } from 'uuid';
import { PaymentResponseDto } from './dto/paymentResponse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schema/payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<Payment>,
  ) {}

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
      success_url: `http://localhost:5000/payment/success/${transactionId}`,
      fail_url: `http://localhost:5000/payment/cancel/${transactionId}`,
      cancel_url: 'http://localhost:3030/cancel',
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

    // console.log(GatewayPageURL, 'tranId: ', transactionId);

    // store payment info on db
    const payment = new this.paymentModel({
      ...paymentOutput,
      paidStatus: false,
      transactionId: data.tran_id,
    });

    await payment.save();

    return {
      GatewayPageURL,
      paymentOutput,
    };
  }

  // SUCCESS PAYMENT
  async successPayment(transactionId: string) {
    const payment = await this.paymentModel.findOne({ transactionId });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    payment.paidStatus = true;

    await payment.save();

    return {
      message: 'Payment successful!',
      payment,
    };
  }

  // CANCEL PAYMENT
  async cancelPayment(transactionId: string) {
    const payment = await this.paymentModel.findOne({ transactionId });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    // Delete the payment record from the database
    await payment.deleteOne();

    return {
      message: 'Payment cancelled and record deleted!',
    };
  }
}
