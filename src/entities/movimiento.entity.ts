import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Bodega } from './bodega.entity';
import { Seccion } from './seccion.entity';
import { MovimientoDetalle } from './movimiento-detalle.entity';
import { AuditoriaDetalle } from './auditoria-detalle.entity';

export enum TipoMovimientoEnum {
  INGRESO = 'ingreso',
  EGRESO = 'egreso',
  TRASLADO = 'traslado',
  ELIMINACION = 'eliminacion',
  AUDITORIA = 'auditoria'
}

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoMovimientoEnum
  })
  tipo: TipoMovimientoEnum;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'id_bodega' })
  id_bodega: number;

  @Column({ name: 'id_seccion', nullable: true })
  id_seccion: number;

  @Column({ name: 'id_seccion_destino', nullable: true })
  id_seccion_destino: number;

  @Column({ name: 'tercero_nombre', type: 'varchar', length: 150, nullable: true })
  tercero_nombre: string;

  @CreateDateColumn({ name: 'fecha_hora' })
  fecha_hora: Date;

  @Column({ type: 'text', nullable: true })
  motivo: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientos)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Bodega, (bodega) => bodega.movimientos)
  @JoinColumn({ name: 'id_bodega' })
  bodega: Bodega;

  @ManyToOne(() => Seccion, (seccion) => seccion.movimientos, { nullable: true })
  @JoinColumn({ name: 'id_seccion' })
  seccion: Seccion;

  @ManyToOne(() => Seccion, (seccion) => seccion.movimientosDestino, { nullable: true })
  @JoinColumn({ name: 'id_seccion_destino' })
  seccionDestino: Seccion;

  @OneToMany(() => MovimientoDetalle, (detalle) => detalle.movimiento)
  detalles: MovimientoDetalle[];

  @OneToMany(() => AuditoriaDetalle, (auditoria) => auditoria.movimiento)
  auditoriaDetalles: AuditoriaDetalle[];
}
