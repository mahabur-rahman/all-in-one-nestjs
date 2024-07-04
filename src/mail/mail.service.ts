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
        user: 'annur4395@gmail.com',
        pass: 'mjkxjismfxzcwasy',
      },
    });

    const mailOptions = {
      from: recipient,
      to: 'mahabur.dev@gmail.com',
      subject: subject,
      text: content,
    };

    console.log('who is send email: ', recipient);
    try {
      const info = await transporter.sendMail(mailOptions);
      return `Email sent: ${info.messageId}`;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
