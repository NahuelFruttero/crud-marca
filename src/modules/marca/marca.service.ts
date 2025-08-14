import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private marcaRepository: Repository<Marca>,
  ) {}

  async findAll(): Promise<Marca[]> {
    return this.marcaRepository.find();
  }

  async findOne(id: number): Promise<Marca | null> {
    return this.marcaRepository.findOneBy({ id });
  }

  async create(denominacion: string): Promise<Marca> {
    const marca = this.marcaRepository.create({ denominacion });
    return this.marcaRepository.save(marca);
  }

  async update(id: number, denominacion: string): Promise<Marca> {
    const marca = await this.findOne(id);
    if (!marca) throw new Error('Marca no encontrada');
    marca.denominacion = denominacion;
    return this.marcaRepository.save(marca);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.findOne(id);
    if (!marca) throw new Error('Marca no encontrada');
    await this.marcaRepository.remove(marca);
  }
}
