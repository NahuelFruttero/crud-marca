import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  findAll(): Promise<Marca[]> {
    return this.marcaRepository.find();
  }

  findOne(id: number): Promise<Marca | null> {
    return this.marcaRepository.findOneBy({ id });
  }

  async create(dto: CreateMarcaDto): Promise<Marca> {
    const marca = this.marcaRepository.create(dto);
    return this.marcaRepository.save(marca);
  }

  async update(id: number, dto: UpdateMarcaDto): Promise<Marca> {
    // `preload` combina id + dto y valida existencia
    const marca = await this.marcaRepository.preload({ id, ...dto });
    if (!marca) throw new NotFoundException('Marca no encontrada');
    return this.marcaRepository.save(marca);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.marcaRepository.findOneBy({ id });
    if (!marca) throw new NotFoundException('Marca no encontrada');
    await this.marcaRepository.remove(marca);
  }
}
