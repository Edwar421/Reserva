import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../../../backend/src/database/AppDataSource';
import { Reserva, EstadoReserva } from '../../../../../backend/src/database/Entidades/reserva.entity';
import { Espacio } from '../../../../../backend/src/database/Entidades/espacio.entity';

function hayConflictoHorario(
  horaInicio1: string,
  horaFin1: string,
  horaInicio2: string,
  horaFin2: string
): boolean {
  // Convertimos las horas a minutos para facilitar la comparación
  const toMinutes = (hora: string) => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  };

  const inicio1 = toMinutes(horaInicio1);
  const fin1 = toMinutes(horaFin1);
  const inicio2 = toMinutes(horaInicio2);
  const fin2 = toMinutes(horaFin2);

  // Hay conflicto si los intervalos se solapan
  return inicio1 < fin2 && inicio2 < fin1;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const reservaRepo = AppDataSource.getRepository(Reserva);
  const espacioRepo = AppDataSource.getRepository(Espacio);

  switch (req.method) {
    case 'GET':
      try {
        const { espacioId, fecha, fechaInicio, fechaFin } = req.query;
        let query = reservaRepo.createQueryBuilder('reserva')
          .leftJoinAndSelect('reserva.espacio', 'espacio')
          .leftJoinAndSelect('reserva.usuario', 'usuario')
          .where('reserva.estado = :estado', { estado: EstadoReserva.ACTIVA });

        if (espacioId) {
          query.andWhere('espacio.id = :espacioId', { espacioId });
        }

        if (fecha) {
          query.andWhere('reserva.fecha = :fecha', { fecha });
        }

        if (fechaInicio && fechaFin) {
          query.andWhere('reserva.fecha BETWEEN :fechaInicio AND :fechaFin', {
            fechaInicio, fechaFin
          });
        }

        const reservas = await query.getMany();
        res.status(200).json(reservas);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener reservas' });
      }
      break;

    case 'POST':
      try {
        const { espacioId, fecha, horaInicio, horaFin, usuarioId } = req.body;

        // Verificar disponibilidad
        const conflicto = await reservaRepo.findOne({
          where: {
            espacio: { id: espacioId },
            fecha,
            estado: EstadoReserva.ACTIVA
          },
          relations: ['espacio']
        });

        if (conflicto && hayConflictoHorario(horaInicio, horaFin, conflicto.horaInicio, conflicto.horaFin)) {
          return res.status(400).json({ error: 'El horario no está disponible' });
        }

        const espacio = await espacioRepo.findOneBy({ id: espacioId });
        if (!espacio) {
          return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        const nuevaReserva = new Reserva();
        nuevaReserva.espacio = espacio;
        nuevaReserva.fecha = fecha;
        nuevaReserva.horaInicio = horaInicio;
        nuevaReserva.horaFin = horaFin;
        nuevaReserva.estado = EstadoReserva.ACTIVA;

        if (usuarioId) {
          // Aquí asignarías el usuario si es necesario
        }

        const reservaGuardada = await reservaRepo.save(nuevaReserva);
        res.status(201).json(reservaGuardada);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear reserva' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}