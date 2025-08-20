import { plainToInstance } from 'class-transformer';
import { Marca } from '../entities/marca.entity';
import { MarcaDto } from '../dto/marca.dto';
import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';

export class MarcaMapper {
  // Entidad -> DTO de salida
  static toDto(entity: Marca): MarcaDto {
    if (!entity) return null as any;
    return plainToInstance(MarcaDto, {
      id: entity.id,
      denominacion: entity.denominacion,
      observacion: entity.observacion ?? '',
      sistema: entity.sistema,
      // acá podrías mapear relaciones o campos calculados si hace falta
    });
  }

  // DTO de creación -> Entidad (opcional, si no usás repo.create(dto) directo)
  static toEntity(createDto: CreateMarcaDto): Marca {
    const e = new Marca();
    e.denominacion = createDto.denominacion;
    e.observacion = createDto.observacion ?? undefined;
    // e.sistema = 0; // ejemplo si tuvieses un default de negocio
    return e;
  }

  // Merge para updates parciales (opcional)
  static merge(entity: Marca, updateDto: UpdateMarcaDto): Marca {
    if (updateDto.denominacion !== undefined) entity.denominacion = updateDto.denominacion;
    if (updateDto.observacion !== undefined) entity.observacion = updateDto.observacion;
    return entity;
  }
}
