import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Seccion } from './seccion.entity';
import { MovimientoDetalle } from './movimiento-detalle.entity';

export enum UbicacionEnum {
  DENTRO = 'dentro',
  FUERA = 'fuera'
}

export enum EstadoEnum {
  NUEVO = 'nuevo',
  EN_SERVICIO = 'en_servicio',
  DESCOMPUESTO = 'descompuesto',
  VENDIDO = 'vendido',
  OTRO = 'otro'
}

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_producto' })
  id_producto: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  serial: string;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @Column({
    type: 'enum',
    enum: UbicacionEnum,
    default: UbicacionEnum.DENTRO
  })
  ubicacion: UbicacionEnum;

  @Column({
    type: 'enum',
    enum: EstadoEnum,
    default: EstadoEnum.NUEVO
  })
  estado: EstadoEnum;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'id_seccion', nullable: true })
  id_seccion: number;

  @ManyToOne(() => Producto, (producto) => producto.items)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => Seccion, (seccion) => seccion.items, { nullable: true })
  @JoinColumn({ name: 'id_seccion' })
  seccion: Seccion;

  @OneToMany(() => MovimientoDetalle, (detalle) => detalle.item)
  movimientoDetalles: MovimientoDetalle[];
}
