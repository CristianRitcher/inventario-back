import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movimiento } from './movimiento.entity';
import { Item } from './item.entity';

@Entity('movimientos_detalles')
export class MovimientoDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_movimiento' })
  id_movimiento: number;

  @Column({ name: 'id_item' })
  id_item: number;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @ManyToOne(() => Movimiento, (movimiento) => movimiento.detalles)
  @JoinColumn({ name: 'id_movimiento' })
  movimiento: Movimiento;

  @ManyToOne(() => Item, (item) => item.movimientoDetalles)
  @JoinColumn({ name: 'id_item' })
  item: Item;
}
