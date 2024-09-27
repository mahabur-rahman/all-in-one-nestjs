import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/sendEmail.dto';

@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  // Send email using nodemailer
  @Mutation(() => Boolean)
  async sendEmail(
    @Args('sendEmailInput') sendEmailInput: SendEmailDto,
  ): Promise<boolean> {
    return this.mailService.sendEmail(sendEmailInput);
  }
}
