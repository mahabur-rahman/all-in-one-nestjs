import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';

@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  @Mutation(() => String)
  async sendEmail(
    @Args('recipient') recipient: string,
    @Args('subject') subject: string,
    @Args('content') content: string,
  ): Promise<string> {
    return this.mailService.sendMail(recipient, subject, content);
  }
}
