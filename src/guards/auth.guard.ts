// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // La ruta es pública, permite el acceso
    }

    // Aquí debes implementar la lógica de verificación de autenticación
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Suponiendo que has configurado el middleware de autenticación

    return user ? true : false; // Permitir el acceso si el usuario está autenticado
  }
}
