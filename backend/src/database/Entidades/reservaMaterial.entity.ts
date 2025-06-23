import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Material } from './material.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class ReservaMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Material, { eager: true })
  material: Material;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservasMaterial, { nullable: true })
  usuario: Usuario;

  @Column()
  cantidad: number;

  @Column()
  fecha: string; // YYYY-MM-DD

  @Column()
  horaInicio: string; // HH:mm

  @Column()
  horaFin: string; // HH:mm

  @CreateDateColumn()
  fechaReserva: Date;
}
