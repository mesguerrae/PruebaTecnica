// auth.controller.ts
import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { PublicGuard } from '../guards/public.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
