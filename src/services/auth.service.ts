// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Implementar la lógica de registro, por ejemplo, guardar el usuario en la base de datos
    const user = await this.userService.createUser(createUserDto);
    // Generar y devolver el token JWT
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmailAndPassword(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar y devolver el token JWT
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }
}
