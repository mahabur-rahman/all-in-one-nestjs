import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    // initialize pubsub 
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return this.appService.getHello();
  }

  @Subscription(() => String)
  helloUpdated() {
    return this.pubSub.asyncIterator('helloUpdated');
  }
}
