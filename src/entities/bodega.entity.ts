import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seccion } from './seccion.entity';
import { Usuario } from './usuario.entity';
import { Producto } from './producto.entity';
import { Movimiento } from './movimiento.entity';

@Entity('bodegas')
export class Bodega {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @OneToMany(() => Seccion, (seccion) => seccion.bodega)
  secciones: Seccion[];

  @OneToMany(() => Usuario, (usuario) => usuario.bodega)
  usuarios: Usuario[];

  @OneToMany(() => Producto, (producto) => producto.bodega)
  productos: Producto[];

  @OneToMany(() => Movimiento, (movimiento) => movimiento.bodega)
  movimientos: Movimiento[];
}
