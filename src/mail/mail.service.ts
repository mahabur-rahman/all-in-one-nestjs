// mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Address } from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto/sendEmail.dto';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private mailTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: +this.configService.get<string>('MAIL_PORT'),
      secure: false, // Change this to true if you are using SSL/TLS
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<boolean> {
    const { from, recipients, subject, html } = sendEmailDto;

    const transporter = this.mailTransporter();

    const options = {
      from:
        from ??
        ({
          name: this.configService.get<string>('APP_NAME'),
          address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
        } as Address),
      to: recipients.map((recipient) => recipient.address),
      subject,
      html,
    };

    try {
      const result = await transporter.sendMail(options);
      return true; // Email sent successfully
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Failed to send email
    }
  }
}
