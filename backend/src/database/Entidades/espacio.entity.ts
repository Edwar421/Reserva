import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserva } from './reserva.entity';

export enum TipoEspacio {
  AULA = 'Aula',
  LAB_COMP = 'Laboratorio de Computación',
  LAB_FISICA = 'Laboratorio de Física',
}

@Entity()
export class Espacio {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: TipoEspacio,
  })
  tipo: TipoEspacio;

  @Column()
  capacidad: number;

  @Column({ nullable: true })
  descripcion: string;

  @OneToMany(() => Reserva, (reserva) => reserva.espacio)
  reservas: Reserva[];
}