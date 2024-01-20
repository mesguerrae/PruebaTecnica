// create-post.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  constructor() {
    this.content = ''; // Inicialización en el constructor
    this.title = '';
  }
}
