import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Movimiento, TipoMovimientoEnum } from '../../entities/movimiento.entity';
import { MovimientoDetalle } from '../../entities/movimiento-detalle.entity';
import { AuditoriaDetalle } from '../../entities/auditoria-detalle.entity';
import { Item } from '../../entities/item.entity';

export interface CreateMovimientoDto {
  tipo: TipoMovimientoEnum;
  id_usuario: number;
  id_bodega: number;
  id_seccion?: number;
  id_seccion_destino?: number;
  tercero_nombre?: string;
  motivo?: string;
  items: Array<{
    id_item: number;
    cantidad: number;
  }>;
  auditoria?: {
    lista_codigos: any;
    cantidad: number;
  };
}

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private movimientosRepository: Repository<Movimiento>,
    @InjectRepository(MovimientoDetalle)
    private movimientoDetalleRepository: Repository<MovimientoDetalle>,
    @InjectRepository(AuditoriaDetalle)
    private auditoriaDetalleRepository: Repository<AuditoriaDetalle>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll(
    page = 1,
    limit = 30,
    tipo?: TipoMovimientoEnum,
    fechaInicio?: Date,
    fechaFin?: Date,
    usuarioId?: number,
    seccionId?: number,
  ): Promise<{ movimientos: Movimiento[]; total: number }> {
    const skip = (page - 1) * limit;
    let whereCondition: any = {};

    if (tipo) whereCondition.tipo = tipo;
    if (usuarioId) whereCondition.id_usuario = usuarioId;
    if (seccionId) whereCondition.id_seccion = seccionId;
    if (fechaInicio && fechaFin) {
      whereCondition.fecha_hora = Between(fechaInicio, fechaFin);
    }

    const [movimientos, total] = await this.movimientosRepository.findAndCount({
      where: whereCondition,
      relations: ['usuario', 'bodega', 'seccion', 'seccionDestino', 'detalles', 'detalles.item', 'auditoriaDetalles'],
      skip,
      take: limit,
      order: { fecha_hora: 'DESC' },
    });

    return { movimientos, total };
  }

  async findOne(id: number): Promise<Movimiento> {
    return this.movimientosRepository.findOne({
      where: { id },
      relations: [
        'usuario', 
        'bodega', 
        'seccion', 
        'seccionDestino', 
        'detalles', 
        'detalles.item', 
        'detalles.item.producto',
        'auditoriaDetalles'
      ],
    });
  }

  async create(movimientoData: CreateMovimientoDto): Promise<Movimiento> {
    const queryRunner = this.movimientosRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear el movimiento
      const movimiento = this.movimientosRepository.create({
        tipo: movimientoData.tipo,
        id_usuario: movimientoData.id_usuario,
        id_bodega: movimientoData.id_bodega,
        id_seccion: movimientoData.id_seccion,
        id_seccion_destino: movimientoData.id_seccion_destino,
        tercero_nombre: movimientoData.tercero_nombre,
        motivo: movimientoData.motivo,
      });

      const savedMovimiento = await queryRunner.manager.save(movimiento);

      // Si es auditoría, crear detalle de auditoría
      if (movimientoData.tipo === TipoMovimientoEnum.AUDITORIA && movimientoData.auditoria) {
        const auditoriaDetalle = this.auditoriaDetalleRepository.create({
          id_movimiento: savedMovimiento.id,
          lista_codigos: movimientoData.auditoria.lista_codigos,
          cantidad: movimientoData.auditoria.cantidad,
        });
        await queryRunner.manager.save(auditoriaDetalle);
      } else {
        // Para otros tipos de movimiento, crear detalles y actualizar inventario
        for (const itemData of movimientoData.items) {
          const detalle = this.movimientoDetalleRepository.create({
            id_movimiento: savedMovimiento.id,
            id_item: itemData.id_item,
            cantidad: itemData.cantidad,
          });
          await queryRunner.manager.save(detalle);

          // Actualizar inventario según el tipo de movimiento
          await this.updateInventory(queryRunner, movimientoData.tipo, itemData, movimientoData);
        }
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedMovimiento.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async updateInventory(
    queryRunner: any,
    tipo: TipoMovimientoEnum,
    itemData: { id_item: number; cantidad: number },
    movimientoData: CreateMovimientoDto,
  ): Promise<void> {
    const item = await queryRunner.manager.findOne(Item, { where: { id: itemData.id_item } });
    if (!item) return;

    switch (tipo) {
      case TipoMovimientoEnum.INGRESO:
        // Aumentar cantidad
        item.cantidad += itemData.cantidad;
        if (movimientoData.id_seccion) {
          item.id_seccion = movimientoData.id_seccion;
        }
        break;

      case TipoMovimientoEnum.EGRESO:
        // Disminuir cantidad
        item.cantidad -= itemData.cantidad;
        if (item.cantidad <= 0) {
          item.cantidad = 0;
          item.id_seccion = null;
        }
        break;

      case TipoMovimientoEnum.TRASLADO:
        // Cambiar sección
        if (movimientoData.id_seccion_destino) {
          item.id_seccion = movimientoData.id_seccion_destino;
        }
        break;

      case TipoMovimientoEnum.ELIMINACION:
        // Marcar como eliminado o reducir cantidad
        item.cantidad -= itemData.cantidad;
        if (item.cantidad <= 0) {
          await queryRunner.manager.remove(item);
          return;
        }
        break;
    }

    await queryRunner.manager.save(item);
  }

  async remove(id: number): Promise<void> {
    await this.movimientosRepository.delete(id);
  }
}
