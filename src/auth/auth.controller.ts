import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly authService: AuthService) {}
}
