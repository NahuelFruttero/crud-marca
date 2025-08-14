import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe,} from '@nestjs/common';
import { MarcaService } from './marca.service';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('marcas')
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
  create(@Body() dto: CreateMarcaDto): Promise<Marca> {
    return this.marcaService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMarcaDto,
  ): Promise<Marca> {
    return this.marcaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.marcaService.remove(id);
  }
}
