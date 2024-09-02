import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NotificationType } from './types/notification.type';
import { NotificationService } from './notification.service';

@Resolver(() => NotificationType)
export class NotificationResolver {
  constructor(
    private pubSub: PubSub,
    private notificationService: NotificationService,
  ) {}

  @Subscription(() => NotificationType, {
    name: 'notificationCreated',
  })
  notificationCreated() {
    return this.pubSub.asyncIterator('notificationCreated');
  }

  // Query to get all notifications
  @Query(() => [NotificationType])
  async getAllNotifications(): Promise<NotificationType[]> {
    return this.notificationService.getAllNotifications();
  }
}
