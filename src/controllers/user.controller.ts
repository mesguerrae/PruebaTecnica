// user.controller.ts
import { Controller, Get, Put, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entity/user.entity';
import { PublicGuard } from '../guards/public.guard';

@Controller('users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Body() user: UserEntity) {
    return this.userService.getProfile(user);
  }

  @UseGuards(AuthGuard())
  @Put('profile')
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @Body() user: UserEntity) {
    return this.userService.updateProfile(updateUserDto, user);
  }
}
