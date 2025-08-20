import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { MarcaRepository } from './repositories/marca.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  controllers: [MarcaController],
  providers: [MarcaService,  { provide: 'IMarcaRepository', useClass: MarcaRepository } ],
  exports: [TypeOrmModule, MarcaService],
})

export class MarcaModule {}