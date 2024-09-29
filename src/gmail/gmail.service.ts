import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GmailService {
  private transporter;
  private otpStore = new Map<string, { otp: string; expiresAt: Date }>(); // In-memory OTP store

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });
  }

  // Generate a 6-digit OTP
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP via email and store it temporarily with an expiration time
  async sendOTP(to: string) {
    const otp = this.generateOTP();
    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}. It will expire in 10 minutes.`;
    const html = `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`;

    // Send the OTP email
    const response = await this.sendEmail(to, subject, text, html);

    if (response.success) {
      // Store OTP and expiration in memory (for 10 minutes)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Expiry time set to 10 minutes
      this.otpStore.set(to, { otp, expiresAt });

      return { success: true };
    } else {
      return { success: false, error: response.error };
    }
  }

  // Verify the OTP for a given email
  verifyOTP(email: string, otp: string): boolean {
    const otpRecord = this.otpStore.get(email);

    if (!otpRecord) {
      throw new Error('OTP not found or expired.');
    }

    const { otp: storedOtp, expiresAt } = otpRecord;

    // Check if OTP is expired
    if (new Date() > expiresAt) {
      this.otpStore.delete(email); // Delete expired OTP
      throw new Error('OTP has expired.');
    }

    // Check if the OTP matches
    if (storedOtp === otp) {
      this.otpStore.delete(email); // Delete OTP after successful verification
      return true;
    }

    return false;
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log('Message sent: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
}
