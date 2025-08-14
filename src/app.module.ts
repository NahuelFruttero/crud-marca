import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarcaModule } from './modules/marca/marca.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MarcaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'db-marca',
      username: 'nahuel',
      password: '1234',
      synchronize: true,
      autoLoadEntities: true,
      port: 5432,
      host: 'localhost',
    }),
    MarcaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
