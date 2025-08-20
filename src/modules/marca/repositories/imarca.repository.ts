import { CreateMarcaDto } from '../dto/create-marca.dto';
import { UpdateMarcaDto } from '../dto/update-marca.dto';
import { Marca } from '../entities/marca.entity';

export interface IMarcaRepository {
  create(data: CreateMarcaDto): Promise<Marca>;                // crear y devolver entidad
  findOne(id: number): Promise<Marca | null>;                  // buscar por id
  findByDenominacion(denominacion: string): Promise<Marca | null>; // buscar único por denominación

  findBy(                                                      // listado paginado + filtro
    denominacion: string,
    skip: number,
    take: number,
  ): Promise<{ data: Marca[]; total: number }>;

  update(id: number, data: UpdateMarcaDto): Promise<Marca>;    // actualizar y devolver entidad
  remove(data: Marca): Promise<Marca>;                         // eliminar
}
