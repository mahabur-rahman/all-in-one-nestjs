import { Resolver } from '@nestjs/graphql';
import { GmailService } from './gmail.service';

@Resolver('Gmail')
export class GmailResolver {
  constructor(private readonly gmailService: GmailService) {}
}
