import {
  Resolver,
  Mutation,
  Args,
  Context,
  Query,
  Subscription,
} from '@nestjs/graphql';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteType } from './types/quote.type';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/utils/jwt.guard';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => QuoteType)
export class QuoteResolver {
  // initialize pubsub

  constructor(private readonly quoteService: QuoteService) {}

  // create quote authenticated user
  @Mutation(() => QuoteType)
  @UseGuards(JwtGuard)
  async createQuote(
    @Args('createQuoteDto') createQuoteDto: CreateQuoteDto,
    @Context('user') user: any,
  ) {
    const newQuote = await this.quoteService.createQuote(
      createQuoteDto,
      user._id,
    );

    // Publish the event for subscription
    pubSub.publish('quoteCreated', { quoteCreated: newQuote });

    return newQuote;
  }

  // SUBSCRIPTION WHEN QUOTE IS CREATED REAL TIME

  @Subscription((returns) => QuoteType)
  quoteCreated() {
    return pubSub.asyncIterator('quoteCreated');
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

  // GET ALL QUOTES | GET QUOTES WITH FILTER
  @Query(() => [QuoteType])
  // @UseGuards(JwtGuard)
  async getAllQuotes(
    @Args('title', { nullable: true }) title?: string,
    @Args('minRating', { nullable: true }) minRating?: number,
  ) {
    return await this.quoteService.getAllQuotes(title, minRating);
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
