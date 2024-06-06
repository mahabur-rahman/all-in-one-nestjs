import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //   signup user
  async signUp(signUpDto: SignUpDto): Promise<{ user: User; token: string }> {
    const { userName, email, password, bio, profileImg } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException(
        'Email already in use.Please try another valid email!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      userName,
      email,
      password: hashedPassword,
      bio,
      profileImg,
    });

    const token = this.jwtService.sign({ id: newUser._id });
    return { user: newUser, token };
  }
}
