import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GmailService {
  private transporter;

  constructor() {
    // Create a transporter object with Gmail-specific configuration
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail's service
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail account
        pass: process.env.EMAIL_PASS, // The generated App Password
      },
    });
  }

  // Method to send an email
  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Sender address
        to, // Receiver's email
        subject, // Subject line
        text, // Plain text body
        html, // HTML body (optional)
      });

      console.log('Message sent: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
}
