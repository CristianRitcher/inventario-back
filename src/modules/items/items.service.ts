import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Item } from '../../entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find({
      relations: ['producto', 'seccion', 'seccion.bodega'],
    });
  }

  async findBySerial(serial: string): Promise<Item> {
    return this.itemsRepository.findOne({
      where: { serial },
      relations: ['producto', 'seccion', 'seccion.bodega'],
    });
  }

  async findByProducto(id_producto: number): Promise<Item[]> {
    return this.itemsRepository.find({
      where: { id_producto },
      relations: ['producto', 'seccion', 'seccion.bodega'],
    });
  }

  async findBySeccion(id_seccion: number): Promise<Item[]> {
    return this.itemsRepository.find({
      where: { id_seccion },
      relations: ['producto', 'seccion', 'seccion.bodega'],
    });
  }

  async findOne(id: number): Promise<Item> {
    return this.itemsRepository.findOne({
      where: { id },
      relations: ['producto', 'seccion', 'seccion.bodega'],
    });
  }

  async create(itemData: Partial<Item>): Promise<Item> {
    const item = this.itemsRepository.create(itemData);
    return this.itemsRepository.save(item);
  }

  async update(id: number, itemData: Partial<Item>): Promise<Item> {
    await this.itemsRepository.update(id, itemData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.itemsRepository.delete(id);
  }

  async searchItems(search: string): Promise<Item[]> {
    return this.itemsRepository.find({
      where: [
        { serial: Like(`%${search}%`) },
        { nombre: Like(`%${search}%`) },
      ],
      relations: ['producto', 'seccion', 'seccion.bodega'],
      take: 50,
    });
  }

  async validateCode(codigo: string): Promise<{ exists: boolean; item?: Item }> {
    const item = await this.findBySerial(codigo);
    return {
      exists: !!item,
      item: item || undefined,
    };
  }
}
