import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Espacio } from './espacio.entity';
import { Usuario } from './usuario.entity';

export enum EstadoReserva {
  ACTIVA = 'activa',
  CANCELADA = 'cancelada',
  COMPLETADA = 'completada'
}

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Espacio, (espacio) => espacio.reservas)
  espacio: Espacio;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, { nullable: true })
  usuario: Usuario;

  @Column()
  fecha: string; // YYYY-MM-DD

  @Column()
  horaInicio: string; // HH:mm

  @Column()
  horaFin: string; // HH:mm

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.ACTIVA
  })
  estado: EstadoReserva;

  @CreateDateColumn()
  fechaReserva: Date;
}