import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarcaModule } from './modules/marca/marca.module';

@Module({
  imports: [
    // Carga .env y lo hace disponible en toda la app
    ConfigModule.forRoot({
      isGlobal: true,          // no hace falta importarlo en otros módulos
      envFilePath: ['.env'],   // podés agregar .env.local, .env.test, etc.
    }),

    // Lee las variables del .env a través del ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),

        autoLoadEntities: true,
        // En prod dejar en false; en dev podés dejar true si querés
      }),
    }),

    MarcaModule, // (quitá el duplicado si lo tenías dos veces)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
