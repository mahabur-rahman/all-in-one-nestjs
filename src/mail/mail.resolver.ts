import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { EmailResponse } from './types/emailResponse.type';

@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  // send email
  @Mutation(() => EmailResponse)
  async sendEmail(
    @Args('sendEmailInput') sendEmailInput: SendEmailDto,
  ): Promise<EmailResponse> {
    const success = await this.mailService.sendEmail(sendEmailInput);
    return { success };
  }
}
