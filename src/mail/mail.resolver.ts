import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { EmailResponse } from './types/emailResponse.type';

@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  @Mutation(() => EmailResponse)
  async sendEmail(
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('subject') subject: string,
    @Args('html') html: string,
  ): Promise<EmailResponse> {
    const sendEmailDto: SendEmailDto = {
      from: { address: from },
      recipients: [{ address: to }],
      subject,
      html,
    };

    const success = await this.mailService.sendEmail(sendEmailDto);

    return { success };
  }
}
