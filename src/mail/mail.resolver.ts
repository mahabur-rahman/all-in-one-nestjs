import { Resolver } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/sendEmail.dto';

@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  async sendEmail() {
    const sendEmailDto: SendEmailDto = {
      from: { name: 'john', address: 'john@example.com' },
      recipients: [
        {
          name: 'jane',
          address: 'jane@example.com',
        },
      ],
      subject: 'Hello World',
      html: '<h1>Hello, world!</h1>',
    };

    return await this.mailService.sendEmail(sendEmailDto);
  }
}
