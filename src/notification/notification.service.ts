import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from './schema/notification.schema';
import { NotificationCount } from './schema/notificationCount.schema'; // Import new schema
import { NotificationType } from './types/notification.type';
import { NotificationResponse } from './types/notificationResponse.type';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(NotificationCount.name) // Inject new model
    private notificationCountModel: Model<NotificationCount>,
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

    // Update notifications count
    await this.updateNotificationCount();

    // Publish the populated notification to subscribers
    this.pubSub.publish('notificationCreated', {
      notificationCreated: notificationType,
    });

    return notificationType;
  }

  async getAllNotifications(): Promise<NotificationResponse> {
    const notifications = await this.notificationModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'userId',
        select: 'firstName lastName email image',
      });

    const notificationsCount = await this.getNotificationCount(); // Fetch count

    const formattedNotifications = notifications.map((notification) => ({
      _id: notification._id.toString(),
      title: notification.title,
      user: notification.userId
        ? ({
            _id: notification.userId._id.toString(),
            firstName: notification.userId.firstName,
            lastName: notification.userId.lastName,
            email: notification.userId.email,
          } as any)
        : null,
    }));

    return {
      notifications: formattedNotifications,
      notificationsCount,
    };
  }

  // async updateNotificationCount() {
  //   const count = await this.notificationCountModel.find();

  //   console.log(count[0].count)
  //   await this.notificationCountModel.findOneAndUpdate(
  //     {},
  //     { count },
  //     { upsert: true }, // Create if it doesn't exist
  //   );
  // }

  async updateNotificationCount() {
    await this.notificationCountModel.findOneAndUpdate(
      {},
      { $inc: { count: 1 } }, // Increment the count field by 1
      { upsert: true, new: true }, // Create if it doesn't exist, return the updated document
    );
  }

  async getNotificationCount(): Promise<number> {
    const countDoc = await this.notificationCountModel.findOne();
    return countDoc ? countDoc.count : 0;
  }

  async notificationCountZero() {
    await this.notificationCountModel.findOneAndUpdate(
      {},
      { count: 0 },
      { upsert: true }, // Create if it doesn't exist
    );
  }
}
