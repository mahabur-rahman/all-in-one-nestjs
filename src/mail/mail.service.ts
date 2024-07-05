import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/sendEmail.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  mailTransporter() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<string>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  // send email
  async sendEmail(sendEmailDto: SendEmailDto) {
    const { from, recipients, subject, html } = sendEmailDto;

    const transport = this.mailTransporter();

    const options = {
      from: from ?? {
        user: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const results = await transport.sendMail(options);
      return results;
    } catch (err) {
      console.log(err);
    }
  }
}
