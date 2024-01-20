// post.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UserEntity } from '../entity/user.entity';
import { PostEntity } from '../entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: UserEntity) {
    const post = this.postRepository.create({
      ...createPostDto,
      user,
    });
    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    //const post = await this.postRepository.findOne(id);
    const post = await this.postRepository.findOne({
      where: { id: id},
    });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: UserEntity) {
    
    //const post = await this.postRepository.findOne(id, { relations: ['user', ] });
    const post = await this.postRepository.findOne({
      where: { id: id},
      relations: ['user', 'user.id'],
    });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    if (post.user.id !== user.id) {
      throw new ForbiddenException('No tienes permiso para editar esta publicación');
    }
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async remove(id: number, user: UserEntity) {
    //const post = await this.postRepository.findOne(id, { relations: ['user'] });
    const post = await this.postRepository.findOne({
      where: { id: id},
      relations: ['user', 'user.id'],
    });
    if (!post) {
      throw new NotFoundException('Publicación no encontrada');
    }
    if (post.user.id !== user.id) {
      throw new ForbiddenException('No tienes permiso para eliminar esta publicación');
    }
    await this.postRepository.softRemove(post);
  }
}
