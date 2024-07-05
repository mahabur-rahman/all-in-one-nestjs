import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailResolver } from './mail.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MailService, MailResolver],
})
export class MailModule {}
