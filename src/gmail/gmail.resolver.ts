import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GmailService } from './gmail.service';

@Resolver('Gmail')
export class GmailResolver {
  constructor(private readonly gmailService: GmailService) {}

  @Mutation(() => Boolean)
  async sendWelcomeEmail(@Args('email') email: string): Promise<boolean> {
    const result = await this.gmailService.sendEmail(
      email,
      'Welcome to Our App',
      'Thank you for signing up to our app!',
      '<p>Thank you for signing up to our app!</p>',
    );
    return result.success; // Return true if the email was sent successfully, false otherwise
  }
}
