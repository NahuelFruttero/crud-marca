import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { Marca } from './entities/marca.entity';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Get()
  findAll(): Promise<Marca[]> {
    return this.marcaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Marca | null> {
    return this.marcaService.findOne(id);
  }

  @Post()
  create(@Body('denominacion') denominacion: string): Promise<Marca> {
    return this.marcaService.create(denominacion);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('denominacion') denominacion: string,
  ): Promise<Marca> {
    return this.marcaService.update(id, denominacion);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
}
