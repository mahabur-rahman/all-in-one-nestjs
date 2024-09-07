import { ObjectType, Field, Int } from '@nestjs/graphql';
import { NotificationType } from './notification.type';

@ObjectType()
export class NotificationResponse {
  @Field(() => [NotificationType])
  notifications: NotificationType[];

  @Field(() => Int)
  notificationsCount: number;
}
