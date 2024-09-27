import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GmailService } from './gmail.service';
import { GmailResolver } from './gmail.resolver';
import { Gmail, GmailSchema } from './schema/gmail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gmail.name, schema: GmailSchema }]),
  ],
  providers: [GmailResolver, GmailService],
})
export class GmailModule {}
