import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,CreateDateColumn,} from 'typeorm';
import { Espacio } from './espacio.entity';
import { Usuario } from './usuario.entity';

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

  @CreateDateColumn()
  fechaReserva: Date;
}
