import { Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NotificationType } from './types/notification.type';
import { NotificationService } from './notification.service';
import { NotificationResponse } from './types/notificationResponse.type';

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

  @Query(() => NotificationResponse)
  async getAllNotifications(): Promise<NotificationResponse> {
    return this.notificationService.getAllNotifications();
  }

  @Mutation(() => String)
  async resetNotificationCount(): Promise<string> {
    await this.notificationService.notificationCountZero();
    return 'Notification count reset to zero';
  }

  @Query(() => Int)
  async getNotificationCount(): Promise<number> {
    return this.notificationService.getNotificationCount();
  }
}
