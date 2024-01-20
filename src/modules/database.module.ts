// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        ({
          type: 'mongodb',
          host: 'localhost',
          port: 27017,
          database: 'pruebatecnica',
          entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
          synchronize: true,
          reconect:false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          logging: true, // Habilitar detalles de registro
          logger: 'advanced-console', // Opciones avanzadas de registro
        } as MongoConnectionOptions), 
    }),
  ],
})



export class DatabaseModule {}
