import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from '../../entities/movimiento.entity';
import { MovimientoDetalle } from '../../entities/movimiento-detalle.entity';
import { AuditoriaDetalle } from '../../entities/auditoria-detalle.entity';
import { Item } from '../../entities/item.entity';
import { MovimientosController } from './movimientos.controller';
import { MovimientosService } from './movimientos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movimiento, MovimientoDetalle, AuditoriaDetalle, Item])],
  controllers: [MovimientosController],
  providers: [MovimientosService],
  exports: [MovimientosService],
})
export class MovimientosModule {}
