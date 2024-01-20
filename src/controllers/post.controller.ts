// post.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PublicGuard } from '../guards/public.guard';
import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { CreatePostDto } from '../dto/create-post.dto'; 
import { UpdatePostDto } from '../dto/update-post.dto';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from '../entity/user.entity';
//import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Body() user: UserEntity) {
    return this.postService.create(createPostDto, user);
  }

  @UseGuards(PublicGuard)
  @Get()
  async findAll() {
    return this.postService.findAll();
  }
  @UseGuards(PublicGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Body() user: UserEntity) {
    return this.postService.update(id, updatePostDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Body() user: UserEntity) {
    return this.postService.remove(id, user);
  }
}
