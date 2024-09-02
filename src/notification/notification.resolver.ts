import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NotificationType } from './types/notification.type';

@Resolver(() => NotificationType)
export class NotificationResolver {
  constructor(private pubSub: PubSub) {}

  @Subscription(() => NotificationType, {
    name: 'notificationCreated',
  })
  notificationCreated() {
    return this.pubSub.asyncIterator('notificationCreated');
  }
}
