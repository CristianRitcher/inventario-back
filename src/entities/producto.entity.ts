import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Bodega } from './bodega.entity';
import { Item } from './item.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marca: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'ruta_imagen', type: 'text', nullable: true })
  ruta_imagen: string;

  @Column({ name: 'MOQ', type: 'int', default: 1 })
  moq: number;

  @Column({ name: 'UM', type: 'varchar', length: 50, nullable: true })
  um: string; // Unidad de medida

  @Column({ name: 'UE', type: 'varchar', length: 50, nullable: true })
  ue: string; // Unidad de empaque

  @Column({ type: 'varchar', length: 255, nullable: true })
  responsable: string;

  @Column({ name: 'es_serial', type: 'boolean', default: false })
  es_serial: boolean;

  @Column({ name: 'id_bodega' })
  id_bodega: number;

  @ManyToOne(() => Bodega, (bodega) => bodega.productos)
  @JoinColumn({ name: 'id_bodega' })
  bodega: Bodega;

  @OneToMany(() => Item, (item) => item.producto)
  items: Item[];
}
