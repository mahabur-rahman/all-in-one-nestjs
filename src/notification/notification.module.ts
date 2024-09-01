import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schema/notification.schema';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
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
