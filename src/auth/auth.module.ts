import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './utils/auth.guard';
import { JwtGuard } from './utils/jwt.guard';
import { RoleGuard } from './utils/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'your_static_jwt_secret_here', 
      signOptions: {
        expiresIn: '3d', 
      },
    }),
  ],
  providers: [AuthResolver, AuthService, AuthGuard, JwtGuard, RoleGuard],
  exports: [AuthService, AuthGuard, JwtGuard, RoleGuard],
})
export class AuthModule {}
