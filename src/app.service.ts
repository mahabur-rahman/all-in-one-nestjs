import { Injectable, Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class AppService {
  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  getHello(): string {
    const message = 'Hello World!';
    this.pubSub.publish('helloUpdated', { helloUpdated: message }); // Publish event
    return message;
  }
}
