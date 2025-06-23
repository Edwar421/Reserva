import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;

  @Column()
  cantidad: number;

  @Column({ nullable: true })
  tiempoPrestamo?: number;
}
