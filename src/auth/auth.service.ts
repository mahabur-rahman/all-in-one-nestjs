import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly client: OAuth2Client;
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
    this.client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 465,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  // sign up
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { firstName, lastName, email, password, role, quotes, image } =
      signUpDto;

    // Check if user already exists in db
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException(
        'Email already in use, try another email address!',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      quotes,
      image,
    });

    return newUser.save();
  }

  // ========================= GOOGLE SIGNIN =========================
  // npm i google-auth-library

  async googleLogin(token: string): Promise<any> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let user = await this.userModel.findOne({ googleId: payload.sub });

    if (!user) {
      user = await this.userModel.create({
        googleId: payload.sub,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        image: payload.picture,
      });
    }

    const jwtPayload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user?.image,
    };

    const jwtToken = await this.jwtService.sign(jwtPayload);

    return { token: jwtToken, user };
  }

  // ========================= FORGOT PASSWORD =========================

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User with this email does not exist.');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    console.log('token : ', token);

    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${token}&id=${user._id}`;

    const message = `Forgot your password? Click this link to reset your password: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    await this.transporter.sendMail({
      to: email,
      subject: 'Your password reset token',
      text: message,
    });

    return 'Token sent to email!';
  }

  // reset password

  async resetPassword(
    token: string,
    userId: string,
    newPassword: string,
  ): Promise<User> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
      };

      if (decoded.userId !== userId) {
        throw new BadRequestException('Invalid token');
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      user.password = await bcrypt.hash(newPassword, 10);

      await user.save();
      return user;
    } catch (error) {
      throw new BadRequestException('Token is invalid');
    }
  }
}
