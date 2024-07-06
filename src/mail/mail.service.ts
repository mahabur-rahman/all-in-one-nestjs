import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto, AttachmentDto } from './dto/sendEmail.dto';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private createTransporter() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: +this.configService.get<string>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<boolean> {
    const { name, email, subject, message, attachments } = sendEmailDto;

    const transporter = this.createTransporter();

    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: `${name}-${email}`,
        to: 'annur4395@gmail.com', // Replace with dynamic recipient if needed
        subject,
        text: message,
        attachments: attachments
          ? attachments.map((attachment: AttachmentDto) => ({
              path: attachment.path,
              filename: attachment.filename,
              contentDisposition: attachment.contentDisposition as any,
            }))
          : [],
      };

      await transporter.sendMail(mailOptions);
      return true; // Email sent successfully
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // Failed to send email
    }
  }
}
