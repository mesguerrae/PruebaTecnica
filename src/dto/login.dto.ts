// login.dto.ts
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
