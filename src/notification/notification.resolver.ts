import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from './schema/notification.schema';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private pubSub: PubSub) {}

  @Subscription(() => Notification, {
    name: 'notificationCreated',
  })
  notificationCreated() {
    return this.pubSub.asyncIterator('notificationCreated');
  }
}
