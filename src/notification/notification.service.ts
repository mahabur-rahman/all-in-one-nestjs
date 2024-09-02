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
    private pubSub: PubSub,
  ) {}

  async createNotification(
    title: string,
    userId: string,
  ): Promise<NotificationType> {
    const newNotification = new this.notificationModel({ title, userId });
    const savedNotification = await newNotification.save();

    // Populate user information
    const populatedNotification = await this.notificationModel
      .findById(savedNotification._id)
      .populate({
        path: 'userId',
        select: 'firstName lastName email',
      })
      .exec();

    if (!populatedNotification) {
      throw new Error('Notification not found');
    }

    // Map the populated notification to NotificationType
    const notificationType: NotificationType = {
      _id: populatedNotification._id.toString(),
      title: populatedNotification.title,
      user: populatedNotification.userId // Ensure user is populated
        ? ({
            _id: populatedNotification.userId._id.toString(),
            firstName: populatedNotification.userId.firstName,
            lastName: populatedNotification.userId.lastName,
            email: populatedNotification.userId.email,
          } as any)
        : null,
    };

    // Publish the populated notification to subscribers
    this.pubSub.publish('notificationCreated', {
      notificationCreated: notificationType, // Publish the notification with populated user
    });

    console.log(notificationType.user?._id);
    console.log(notificationType.user?.email);
    console.log(notificationType.user);
    return notificationType;
  }

  // Get all notifications
  async getAllNotifications(): Promise<NotificationType[]> {
    const notifications = await this.notificationModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'userId',
        select: 'firstName lastName email image',
      });

    // Map each notification to the NotificationType format
    return notifications.map((notification) => ({
      _id: notification._id.toString(),
      title: notification.title,
      user: notification.userId
        ? ({
            _id: notification.userId._id,
            firstName: notification.userId.firstName,
            lastName: notification.userId.lastName,
            email: notification.userId.email,
          } as any)
        : null,
    }));
  }
}
