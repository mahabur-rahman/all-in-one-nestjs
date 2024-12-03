import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
// import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
