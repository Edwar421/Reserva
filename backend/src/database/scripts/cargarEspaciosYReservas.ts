import * as fs from 'fs';
import { AppDataSource } from '../AppDataSource'; // Esto sube un nivel y entra a data-source.ts
import { Espacio, TipoEspacio } from '../entidades/espacio.entity';
import { Reserva } from '../entidades/reserva.entity';

async function cargarEspaciosYReservas() {
  const espaciosData = fs.readFileSync('src/data/espacios.txt', 'utf-8');
  const reservasData = fs.readFileSync('src/data/reservas.txt', 'utf-8');

  const lineasEspacios = espaciosData.split('\n').filter((linea) => linea.trim() !== '');
  const lineasReservas = reservasData.split('\n').filter((linea) => linea.trim() !== '');

  const espacios: Espacio[] = [];
  const reservas: Reserva[] = [];

  // Cargar espacios
  lineasEspacios.forEach((linea) => {
    const [nombre, tipoTexto, capacidadStr, descripcion] = linea.split(';').map((v) => v.trim());
    const tipo = convertirATipoEspacio(tipoTexto);
    const capacidad = parseInt(capacidadStr);
    if (tipo && !isNaN(capacidad)) {
      const espacio = new Espacio();
      espacio.nombre = nombre;
      espacio.tipo = tipo;
      espacio.capacidad = capacidad;
      espacio.descripcion = descripcion;
      espacios.push(espacio);
    }
  });

  // Cargar reservas
  lineasReservas.forEach((linea) => {
    const [idEspacio, fecha, horaInicio, horaFin] = linea.split(';').map((v) => v.trim());
    const reserva = new Reserva();
    reserva.espacio = { id: parseInt(idEspacio) } as Espacio;
    reserva.fecha = fecha;
    reserva.horaInicio = horaInicio;
    reserva.horaFin = horaFin;
    reservas.push(reserva);
  });

  const espacioRepo = AppDataSource.getRepository(Espacio);
  const reservaRepo = AppDataSource.getRepository(Reserva);

  await espacioRepo.save(espacios);
  await reservaRepo.save(reservas);
  console.log('Datos de espacios y reservas cargados correctamente');
}

function convertirATipoEspacio(valor: string): TipoEspacio | null {
  switch (valor.toLowerCase()) {
    case 'aula':
      return TipoEspacio.AULA;
    case 'laboratorio de computación':
      return TipoEspacio.LAB_COMP;
    case 'laboratorio de física':
      return TipoEspacio.LAB_FISICA;
    default:
      return null;
  }
}

AppDataSource.initialize()
  .then(async () => {
    await cargarEspaciosYReservas();
    process.exit();
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos', err);
    process.exit(1);
  });
