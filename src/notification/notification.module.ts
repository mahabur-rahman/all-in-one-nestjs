import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schema/notification.schema';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { PubSub } from 'graphql-subscriptions';
import {
  NotificationCount,
  NotificationCountSchema,
} from './schema/notificationCount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: NotificationCount.name, schema: NotificationCountSchema },
    ]),
  ],
  providers: [
    NotificationResolver,
    NotificationService,
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
  exports: [NotificationService, PubSub],
})
export class NotificationModule {}
