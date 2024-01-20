// create-user.dto.ts
import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  constructor() {
    this.fullName = ''; // Inicialización en el constructor
    this.email = '';
    this.password = '';
  }
}
