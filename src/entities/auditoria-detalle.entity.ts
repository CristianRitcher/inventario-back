import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movimiento } from './movimiento.entity';

@Entity('auditorias_detalles')
export class AuditoriaDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_movimiento' })
  id_movimiento: number;

  @Column({ name: 'lista_codigos', type: 'json' })
  lista_codigos: any;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @ManyToOne(() => Movimiento, (movimiento) => movimiento.auditoriaDetalles)
  @JoinColumn({ name: 'id_movimiento' })
  movimiento: Movimiento;
}
