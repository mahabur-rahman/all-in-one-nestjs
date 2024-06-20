import { Module, forwardRef } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthResolver, AuthService, JwtGuard, RoleGuard, AuthGuard],
  exports: [JwtGuard, RoleGuard, AuthGuard],
})
export class AuthModule {}
