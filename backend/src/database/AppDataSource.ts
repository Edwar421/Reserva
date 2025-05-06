import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Espacio } from './Entidades/espacio.entity';
import { Reserva } from './Entidades/reserva.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // o config.postgres.host si lo importas
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'nombre_basedatos',
  schema: 'public',
  synchronize: false,
  logging: false,
  entities: [Espacio, Reserva],
});
