import { Query, Resolver } from '@nestjs/graphql';
import { MailerService } from './mailer.service';

@Resolver()
export class MailerResolver {
  constructor(private readonly mailerService: MailerService) {}

  @Query(() => String)
  helloMyDocument(): string {
    return 'hello world from HelloModule';
  }
}
