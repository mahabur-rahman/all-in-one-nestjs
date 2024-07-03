import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteType } from './types/quote.type';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/utils/jwt.guard';

@Resolver(() => QuoteType)
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService) {}

  // create quote authenticated user
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async createQuote(
    @Args('createQuoteDto') createQuoteDto: CreateQuoteDto,
    @Context('user') user: any,
  ) {
    return this.quoteService.createQuote(createQuoteDto, user._id);
  }

  // =====================================================
  // =====================================================
  // =====================================================

  // query getAllQuotes{
  //   getAllQuotes{
  //     _id
  //     title
  //     createBy{
  //       _id
  //       firstName
  //       lastName
  //       email
  //       role
  //     }
  //   }
  // }

  // get all quotes
  @Query(() => [QuoteType])
  // @UseGuards(JwtGuard)
  async getAllQuotes(@Args('title', { nullable: true }) title?: string) {
    return await this.quoteService.getAllQuotes(title);
  }

  // get single quote :id
  @Query(() => QuoteType)
  // @UseGuards(JwtGuard)
  async getSingleQuoteById(@Args('id') id: string) {
    return await this.quoteService.getSingleQuoteById(id);
  }

  // delete quote :id if user id matches with createBy in quote
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async deleteQuote(@Args('id') id: string, @Context('user') user: any) {
    // console.log(`user`, user);
    const userId = user._id;
    return await this.quoteService.deleteQuoteById(id, userId);
  }

  // Update quote :id if user id matches with createBy in quote
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async updateQuote(
    @Args('id') id: string,
    @Args('title') title: string,
    @Context('user') user: any,
  ) {
    // console.log(`user : `, user);
    const userId = user._id;
    return await this.quoteService.updateQuoteById(id, title, userId);
  }

  // likes quote
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async likeQuote(@Args('id') id: string, @Context('user') user: any) {
    const userId = user._id;
    return await this.quoteService.likeQuote(id, userId);
  }

  // dislikes a quote
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async dislikeQuote(@Args('id') id: string, @Context('user') user: any) {
    const userId = user._id;
    return await this.quoteService.dislikeQuote(id, userId);
  }

  // for increase rating
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async increaseRating(
    @Args('id') id: string,
    @Args('rating') rating: number,
    @Context('user') user: any,
  ) {
    return await this.quoteService.increaseRating(id, rating, user._id);
  }
}
