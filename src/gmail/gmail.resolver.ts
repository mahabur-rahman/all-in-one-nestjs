import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GmailService } from './gmail.service';

@Resolver('Gmail')
export class GmailResolver {
  constructor(private readonly gmailService: GmailService) {}

  // Mutation to send OTP
  @Mutation(() => String, { description: 'Send OTP to a user email' })
  async sendOTP(@Args('email') email: string): Promise<string> {
    const otpResponse = await this.gmailService.sendOTP(email);

    if (otpResponse.success) {
      return `OTP has been sent to ${email}`;
    } else {
      throw new Error(`Failed to send OTP: ${otpResponse.error}`);
    }
  }

  // Mutation to verify OTP
  @Mutation(() => Boolean, { description: 'Verify OTP sent to user email' })
  async verifyOTP(
    @Args('email') email: string,
    @Args('otp') otp: string,
  ): Promise<boolean> {
    try {
      const isValid = this.gmailService.verifyOTP(email, otp);
      return isValid;
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return false;
    }
  }
}
