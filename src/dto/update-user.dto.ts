// update-user.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;

  constructor() {
    this.email = ''; // Inicialización en el constructor
    this.fullName = '';
    this.password = '';
  }
}
