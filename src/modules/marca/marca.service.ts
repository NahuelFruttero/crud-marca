import { Injectable, Inject, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcaDto } from './dto/marca.dto';
import { Marca } from './entities/marca.entity';
import { MarcaMapper } from './mappers/marca.mapper';


// Contrato esperado para el repositorio inyectado (token 'IMarcaRepository')
export interface IMarcaRepository {
  create(dto: CreateMarcaDto): Promise<Marca>;
  update(id: number, dto: UpdateMarcaDto): Promise<Marca>;
  findBy(denominacion: string, skip: number, take: number): Promise<{ data: Marca[]; total: number }>;
  findOne(id: number): Promise<Marca | null>;
  findOneByDenominacion(denominacion: string): Promise<Marca | null>;
  remove(entity: Marca): Promise<void>;
}

@Injectable()
export class MarcaService {
  private readonly logger = new Logger(MarcaService.name);
  private readonly ENTITY_NAME = 'Marca';

  constructor(
    @Inject('IMarcaRepository')
    private readonly repository: IMarcaRepository,
  ) {}

  // --------- CREATE ----------
  async create(dto: CreateMarcaDto): Promise<MarcaDto> {
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${dto.denominacion}`);
    // En create, excludeId = 0 para no excluir ninguno
    await this.checkDenominacionExists(dto.denominacion, 0);
    const entity = await this.repository.create(dto);
    return MarcaMapper.toDto(entity);
  }

  // --------- UPDATE ----------
  async update(id: number, dto: UpdateMarcaDto): Promise<Marca> {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con ID: ${id}`);
    // Asegura existencia (lanza 404 si no existe)
    const marca = await this.findEntityById(id);

    // Si cambia la denominación, valida unicidad excluyendo el propio ID
    if (dto.denominacion) {
      await this.checkDenominacionExists(dto.denominacion, id);
    }

    return this.repository.update(id, dto);
  }

  // --------- SEARCH (paginado + filtro por denominación) ----------
  async findBy(
    denominacion: string,
    skip = 0,
    take = 10,
  ): Promise<{ data: MarcaDto[]; total: number }> {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con denominación: ${denominacion}  skip=${skip}, take=${take}`);
    const result = await this.repository.findBy(denominacion, skip, take);

    const data: MarcaDto[] = result.data.map((marca) => MarcaMapper.toDto(marca));
    return { data, total: result.total };
  }

  // --------- GET BY ID (DTO) ----------
  async findDtoById(id: number): Promise<MarcaDto> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
    }
    return MarcaMapper.toDto(entity);
  }

  // --------- GET BY ID (Entidad) ----------
  async findEntityById(id: number): Promise<Marca> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
    }
    return entity;
  }

  // --------- DELETE ----------
  async remove(id: number): Promise<void> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
    }
    return this.repository.remove(entity);
  }

  // --------- REGLA DE NEGOCIO: Unicidad de denominación ----------
  private async checkDenominacionExists(denominacion: string, excludeId?: number) {
    const found = await this.repository.findOneByDenominacion(denominacion);
    if (found && found.id !== excludeId) {
      throw new ConflictException(
        `${this.ENTITY_NAME} con denominación "${denominacion}" ya existe.`,
      );
    }
  }
}
