// app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { ErrorMiddleware } from '../middlewares/error.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { DatabaseModule } from './database.module';

@Module({
  // ...
  imports: [DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Aplica el middleware de registro a todas las rutas

    consumer
      .apply(ErrorMiddleware)
      .forRoutes('*'); // Aplica el middleware de manejo de errores a todas las rutas

    consumer
      .apply(AuthMiddleware)
      .forRoutes('rutas-que-requieren-autenticacion'); // Aplica el middleware de autenticación solo a rutas específicas
  }
}