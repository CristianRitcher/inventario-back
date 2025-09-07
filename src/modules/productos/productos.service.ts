import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Producto } from '../../entities/producto.entity';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async findAll(page = 1, limit = 30, search?: string): Promise<{ productos: Producto[]; total: number }> {
    const skip = (page - 1) * limit;
    let whereCondition = {};

    if (search) {
      whereCondition = [
        { nombre: Like(`%${search}%`) },
        { sku: Like(`%${search}%`) },
        { marca: Like(`%${search}%`) },
      ];
    }

    const [productos, total] = await this.productosRepository.findAndCount({
      where: whereCondition,
      relations: ['bodega', 'items'],
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return { productos, total };
  }

  async findBySku(sku: string): Promise<Producto> {
    return this.productosRepository.findOne({
      where: { sku },
      relations: ['bodega', 'items'],
    });
  }

  async findOne(id: number): Promise<Producto> {
    return this.productosRepository.findOne({
      where: { id },
      relations: ['bodega', 'items', 'items.seccion'],
    });
  }

  async create(productoData: Partial<Producto>): Promise<Producto> {
    const producto = this.productosRepository.create(productoData);
    return this.productosRepository.save(producto);
  }

  async update(id: number, productoData: Partial<Producto>): Promise<Producto> {
    await this.productosRepository.update(id, productoData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    if (producto?.ruta_imagen) {
      // Extraer public_id de la URL de Cloudinary para eliminar la imagen
      const publicId = this.extractPublicIdFromUrl(producto.ruta_imagen);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    await this.productosRepository.delete(id);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'inventario/productos',
          transformation: [{ width: 256, height: 256, crop: 'fill' }],
          format: 'jpg',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        },
      ).end(file.buffer);
    });
  }

  private extractPublicIdFromUrl(url: string): string | null {
    const regex = /\/v\d+\/(.+)\./;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
