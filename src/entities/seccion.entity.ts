import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Bodega } from './bodega.entity';
import { Item } from './item.entity';
import { Movimiento } from './movimiento.entity';

@Entity('secciones')
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'id_bodega' })
  id_bodega: number;

  @ManyToOne(() => Bodega, (bodega) => bodega.secciones)
  @JoinColumn({ name: 'id_bodega' })
  bodega: Bodega;

  @OneToMany(() => Item, (item) => item.seccion)
  items: Item[];

  @OneToMany(() => Movimiento, (movimiento) => movimiento.seccion)
  movimientos: Movimiento[];

  @OneToMany(() => Movimiento, (movimiento) => movimiento.seccionDestino)
  movimientosDestino: Movimiento[];
}
