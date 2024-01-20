import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.modules';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agregar pipes y configuraciones adicionales
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Iniciar la aplicación en el puerto 3000 (puedes cambiarlo según tu preferencia)
  await app.listen(3000);
}
bootstrap();
