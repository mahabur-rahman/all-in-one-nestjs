// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async sendMail(recipient: string, subject: string, content: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: recipient,
      subject: subject,
      text: content,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return `Email sent: ${info.messageId}`;
    } catch (error) {
      throw new Error(`Failed to send email: ${error}`);
    }
  }
}
