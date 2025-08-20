import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, UsePipes, Logger} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MarcaService } from './marca.service';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcaDto } from './dto/marca.dto';
import { PaginationWithDenominacionDto } from './dto/pagination-denominacion.dto';
import { NormalizeDenominacionPipe } from './pipes/normalization-denominacion.pipe';


@ApiTags('Gestion Marcas')
@Controller('marca')

export class MarcaController {

  private readonly logger = new Logger(MarcaController.name);
  private readonly ENTITY_NAME = 'Marca';

  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  @UsePipes(NormalizeDenominacionPipe)
  create(@Body() createDto: CreateMarcaDto) {
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
    return this.marcaService.create(createDto);
  }

  @Get('search-by')
    findByDenominacionFiltered(
      @Query() paginationDto: PaginationWithDenominacionDto,
    ) {
      const { denominacion = '', skip, take } = paginationDto;
      this.logger.log(
        `Buscando ${this.ENTITY_NAME} con denominación: ${denominacion}`,
      );
      return this.marcaService.findBy(denominacion, skip, take);
    }


  @Get(':id')
  @ApiOkResponse({ type: MarcaDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MarcaDto> {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con ID: ${id}`);
    return this.marcaService.findDtoById(id);
  }

  @Put(':id')
  @UsePipes(NormalizeDenominacionPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMarcaDto,
  ) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con ID: ${id}`);
    return this.marcaService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.warn(`Eliminando ${this.ENTITY_NAME} con ID: ${id} por usuario:`);
    return this.marcaService.remove(id);
  }
}
