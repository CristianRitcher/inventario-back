import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from '../../entities/seccion.entity';

@Injectable()
export class SeccionesService {
  constructor(
    @InjectRepository(Seccion)
    private seccionesRepository: Repository<Seccion>,
  ) {}

  async findAll(): Promise<Seccion[]> {
    return this.seccionesRepository.find({
      relations: ['bodega'],
    });
  }

  async findByBodega(id_bodega: number): Promise<Seccion[]> {
    return this.seccionesRepository.find({
      where: { id_bodega },
      relations: ['bodega'],
    });
  }

  async findOne(id: number): Promise<Seccion | null> {
    return this.seccionesRepository.findOne({
      where: { id },
      relations: ['bodega', 'items'],
    });
  }

  async create(seccionData: Partial<Seccion>): Promise<Seccion> {
    const seccion = this.seccionesRepository.create(seccionData);
    return this.seccionesRepository.save(seccion);
  }

  async update(id: number, seccionData: Partial<Seccion>): Promise<Seccion> {
    await this.seccionesRepository.update(id, seccionData);
    const seccion = await this.findOne(id);
    if (!seccion) {
      throw new Error(`Seccion with ID ${id} not found`);
    }
    return seccion;
  }

  async remove(id: number): Promise<void> {
    await this.seccionesRepository.delete(id);
  }
}
