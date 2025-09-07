import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from '../../entities/bodega.entity';

@Injectable()
export class BodegasService {
  constructor(
    @InjectRepository(Bodega)
    private bodegasRepository: Repository<Bodega>,
  ) {}

  async findAll(): Promise<Bodega[]> {
    return this.bodegasRepository.find({
      relations: ['secciones'],
    });
  }

  async findOne(id: number): Promise<Bodega> {
    return this.bodegasRepository.findOne({
      where: { id },
      relations: ['secciones', 'usuarios', 'productos'],
    });
  }

  async create(bodegaData: Partial<Bodega>): Promise<Bodega> {
    const bodega = this.bodegasRepository.create(bodegaData);
    return this.bodegasRepository.save(bodega);
  }

  async update(id: number, bodegaData: Partial<Bodega>): Promise<Bodega> {
    await this.bodegasRepository.update(id, bodegaData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bodegasRepository.delete(id);
  }
}
