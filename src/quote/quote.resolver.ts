import { Resolver } from '@nestjs/graphql';
import { QuoteService } from './quote.service';

@Resolver()
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService) {}
}
