import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './Entidades/usuario.entity';
import { Espacio } from './Entidades/espacio.entity';
import { Reserva } from './Entidades/reserva.entity';
import { Material } from './Entidades/material.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // o config.postgres.host si lo importas
  port: 5432,
  username: 'postgres',
  password: 'toor',
  database: 'reservas',
  schema: 'public',
  synchronize: false,
  logging: false,
  entities: [Espacio, Reserva,Usuario, Material],
});
