// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/sendEmail.dto';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  // Create transporter for sending emails
  private createTransporter() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: +this.configService.get<string>('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  // Send email using nodemailer
  async sendEmail(sendEmailDto: SendEmailDto): Promise<boolean> {
    const { name, email, subject, message } = sendEmailDto;

    const transporter = this.createTransporter();

    try {
      const mailOptions = {
        from: `${name}-${email}`,
        to: 'annur4395@gmail.com',
        subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);
      return true; // Email sent successfully
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Failed to send email
    }
  }
}
