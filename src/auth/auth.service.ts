import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  //   signUp
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { firstName, lastName, email, password, role } = signUpDto;

    // check if user already exists in db
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException(
        `Email already in use, try another email address!`,
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
    });

    return newUser.save();
  }

  //   login user
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException(`User does not exist!`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException(`Invalid credentials!`);
    }

    return user;
  }
}
