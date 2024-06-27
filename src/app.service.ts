// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}


// PORT=5000
// MONGO_URI=mongodb+srv://mahabur:mahabur@cluster0.2b3niye.mongodb.net/react-nest-graphql
// JWT_SECRET=conding
// JWT_EXPIRES=3d
// GOOGLE_CLIENT_ID=798595537666-uvk7ccs7utbmj0vi6oe5joo4mdeleevl.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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
// GOOGLE_OAUTH_CALLBACK_URL=http://localhost:5000/auth/google/callback