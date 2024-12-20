import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuoteModule } from './quote/quote.module';
import { CommentModule } from './comment/comment.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from './mail/mail.module';
import { GatewayModule } from './gateway/gateway.module';
import { PaymentModule } from './payment/payment.module';
import { PubSub } from 'graphql-subscriptions';
import { NotificationModule } from './notification/notification.module';
import { GmailModule } from './gmail/gmail.module';
import { CalenderModule } from './calender/calender.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,

      installSubscriptionHandlers: true, // Enable subscription handlers
    }),

    AuthModule,
    UserModule,
    QuoteModule,
    CommentModule,
    PassportModule,
    MailModule,
    GatewayModule,
    PaymentModule,
    NotificationModule,
    GmailModule,
    CalenderModule,
    TaskModule,
  ],
  providers: [
    AppResolver,
    AppService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
