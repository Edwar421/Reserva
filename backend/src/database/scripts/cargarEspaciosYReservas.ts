import * as fs from 'fs';
import { AppDataSource } from '../AppDataSource'; // Esto sube un nivel y entra a data-source.ts
import { Espacio, TipoEspacio } from '../entidades/espacio.entity';
import { Reserva } from '../entidades/reserva.entity';

async function cargarEspaciosYReservas() {
  const espaciosData = fs.readFileSync('src/data/espacios.txt', 'utf-8');
  const reservasData = fs.readFileSync('src/data/reservas.txt', 'utf-8');

  const lineasEspacios = espaciosData.split('\n').filter((linea) => linea.trim() !== '');
  const lineasReservas = reservasData.split('\n').filter((linea) => linea.trim() !== '');

  const espacioRepo = AppDataSource.getRepository(Espacio);
  const reservaRepo = AppDataSource.getRepository(Reserva);

  await reservaRepo.clear();
  await espacioRepo.clear();

  const espacios: Espacio[] = [];

  function convertirATipoEspacio(valor: string): TipoEspacio | null {
    const textoNormalizado = valor
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .trim();
  
    switch (textoNormalizado) {
      case 'aula':
        return TipoEspacio.AULA;
      case 'laboratorio de computacion':
        return TipoEspacio.LAB_COMP;
      case 'laboratorio de fisica':
        return TipoEspacio.LAB_FISICA;
      default:
        console.warn(`Tipo de espacio desconocido: "${valor}"`);
        return null;
    }
  }
  

  for (const linea of lineasEspacios) {
    const [nombre, tipoTexto, capacidadStr, descripcion] = linea.split(';').map((v) => v.trim());
    const tipo = convertirATipoEspacio(tipoTexto);
    const capacidad = parseInt(capacidadStr);
    const idExtraido = parseInt(nombre.match(/\d+/)?.[0] || '0');
    if (tipo && !isNaN(capacidad)) {
      const espacio = new Espacio();
      espacio.id = idExtraido;
      espacio.nombre = nombre;
      espacio.tipo = tipo;
      espacio.capacidad = capacidad;
      espacio.descripcion = descripcion;
      espacios.push(espacio);
    }
  }

  await espacioRepo.save(espacios);

  const reservas: Reserva[] = [];

  for (const linea of lineasReservas) {
    const [idEspacioStr, fecha, horaInicio, horaFin] = linea.split(';').map((v) => v.trim());
    const idEspacio = parseInt(idEspacioStr);

    const espacio = await espacioRepo.findOneBy({ id: idEspacio });
    if (!espacio) continue;

    const reserva = new Reserva();
    reserva.espacio = espacio;
    reserva.fecha = fecha;
    reserva.horaInicio = horaInicio;
    reserva.horaFin = horaFin;
    // reserva.usuario = algúnUsuario; // Si decides asignar uno
    reservas.push(reserva);
  }

  await reservaRepo.save(reservas);
  console.log('Datos de espacios y reservas cargados correctamente');
}
