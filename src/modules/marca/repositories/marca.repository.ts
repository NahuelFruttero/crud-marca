// src/modules/marca/repositories/marca.repository.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, IsNull } from 'typeorm';

import { Marca } from '../entities/marca.entity';
import { IMarcaRepository } from './imarca.repository';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

@Injectable()
export class MarcaRepository implements IMarcaRepository {
  private readonly logger = new Logger(MarcaRepository.name);
  private readonly ENTITY_NAME = 'Marca';

  constructor(
    @InjectRepository(Marca)
    private readonly repository: Repository<Marca>,
  ) {}

  // ---------- CREATE ----------
  async create(data: CreateMarcaDto): Promise<Marca> {
    try {
      const nueva = this.repository.create(data);
      return await this.repository.save(nueva);
    } catch (error) {
      this.logger.error(`Error creando ${this.ENTITY_NAME}`, error as any);
      throw new InternalServerErrorException('Error al crear la marca.');
    }
  }

  // ---------- READ: por ID ----------
  async findOne(id: number): Promise<Marca | null> {
    // Excluye registros "eliminados" (soft delete)
    const entity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    return entity ?? null;
  }

  // ---------- READ: por denominación (único) ----------
  async findByDenominacion(denominacion: string): Promise<Marca | null> {
    const entity = await this.repository.findOne({
      where: { denominacion, deletedAt: IsNull() },
    });
    return entity ?? null;
  }

  // ---------- LIST: filtro + paginación ----------
  async findBy(
    denominacion: string,
    skip: number,
    take: number,
  ): Promise<{ data: Marca[]; total: number }> {
    const where = denominacion
      ? { denominacion: ILike(`%${denominacion}%`), deletedAt: IsNull() }
      : { deletedAt: IsNull() };

    const [data, total] = await this.repository.findAndCount({
      where,
      skip,
      take,
      order: { denominacion: 'ASC' },
    });

    return { data, total };
  }

  // ---------- UPDATE ----------
  async update(id: number, data: UpdateMarcaDto): Promise<Marca> {
    try {
      const existente = await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
      if (!existente) throw new NotFoundException('Marca no encontrada');

      this.repository.merge(existente, data);
      return await this.repository.save(existente);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error actualizando ${this.ENTITY_NAME} ${id}`, error as any);
      throw new InternalServerErrorException('Error al actualizar marca.');
    }
  }

  // ---------- SOFT DELETE ----------
  async remove(entity: Marca): Promise<Marca> {
    try {
      if (entity.deletedAt) {
        // Idempotente: ya estaba “eliminada”
        throw new NotFoundException('Entidad ya eliminada.');
      }
      entity.deletedAt = new Date();
      return await this.repository.save(entity);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error eliminando ${this.ENTITY_NAME} ${entity?.id}`, error as any);
      throw new InternalServerErrorException('Error al eliminar marca.');
    }
  }
}
