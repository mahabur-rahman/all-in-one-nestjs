import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteType } from './types/quote.type';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/utils/jwt.guard';

@Resolver(() => QuoteType)
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService) {}

  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async createQuote(
    @Args('createQuoteDto') createQuoteDto: CreateQuoteDto,
    @Context('user') user: any,
  ) {
    console.log(`User : `, user._id);
    return this.quoteService.createQuote(createQuoteDto);
  }
}
