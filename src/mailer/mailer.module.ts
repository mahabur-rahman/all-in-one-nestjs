import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerResolver } from './mailer.resolver';

@Module({
  providers: [MailerResolver, MailerService],
})
export class MailerModule {}
