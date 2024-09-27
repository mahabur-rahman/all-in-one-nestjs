import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailResolver } from './gmail.resolver';

@Module({
  providers: [GmailResolver, GmailService],
})
export class GmailModule {}
