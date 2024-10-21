import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity'; // Import the User entity

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register the User entity with TypeORM
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
