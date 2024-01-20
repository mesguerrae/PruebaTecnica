// update-post.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  constructor() {
    this.title = ''; // Inicialización en el constructor
    this.content = '';
  }
}
