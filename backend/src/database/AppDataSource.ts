import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './Entidades/usuario.entity';
import { Espacio } from './Entidades/espacio.entity';
import { Reserva } from './Entidades/reserva.entity';
import { Material } from './Entidades/material.entity';
import { ReservaMaterial } from './Entidades/reservaMaterial.entity';
import { Calendario } from './Entidades/calendario.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // o config.postgres.host si lo importas
  port: 5432,
  username: 'postgres',
  password: '1234567',
  database: 'reservas',
  schema: 'public',
  synchronize: false,
  logging: false,
  entities: [Espacio, Reserva,Usuario, Material,ReservaMaterial, Calendario],
  migrations: ['src/database/migrations/*.ts'],
});
