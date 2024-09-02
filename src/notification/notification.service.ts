import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from './schema/notification.schema';
import { NotificationType } from './types/notification.type';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private pubSub: PubSub, // Inject PubSub for real-time updates
  ) {}

  async createNotification(
    title: string,
    userId: string,
  ): Promise<NotificationType> {
    const newNotification = new this.notificationModel({ title, userId });
    const savedNotification = await newNotification.save();

    // Publish the notification to subscribers
    this.pubSub.publish('notificationCreated', {
      notificationCreated: savedNotification,
    });

    return savedNotification;
  }
}
