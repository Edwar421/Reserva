import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum TipoUsuario {
  Estudiante = "Estudiante",
  Profesor = "Profesor",
  Externo = "Externo",
  Laborista = "Laborista"
}

@Entity()
export class usuario {
  @PrimaryColumn({ type: 'varchar', length: 45 })
  email: string;

  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Exclude()
  @Column({ type: 'varchar', length: 45 })
  password: string;

  @Column({ type: "enum", enum: TipoUsuario,})
  tipo: TipoUsuario;

  @Column({ type: 'varchar', length: 20, nullable: true })
  codigoEstudiantil: string;

  @Column({ type: 'varchar', length: 20 })
  cedula: string;
}
