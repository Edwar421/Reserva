import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../../../../backend/src/database/AppDataSource';
import { Reserva, EstadoReserva } from '../../../../../../backend/src/database/Entidades/reserva.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const { id, fecha } = req.query;
  const reservaRepo = AppDataSource.getRepository(Reserva);

  if (req.method === 'GET') {
    try {
      const reservasExistentes = await reservaRepo.find({
        where: {
          espacio: { id: parseInt(id as string) },
          fecha: fecha as string,
          estado: EstadoReserva.ACTIVA
        },
        relations: ['espacio', 'usuario']
      });

      // Horarios disponibles (6:00 - 20:00 en bloques de 2 horas)
      const horariosBase = [
        '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'
      ];

      const disponibilidad = horariosBase.map(hora => {
        const horaFin = calcularHoraFin(hora);
        const reservaConflicto = reservasExistentes.find(reserva => 
          hayConflictoHorario(hora, horaFin, reserva.horaInicio, reserva.horaFin)
        );

        return {
          hora,
          horaFin,
          disponible: !reservaConflicto,
          reserva: reservaConflicto ? {
            id: reservaConflicto.id,
            usuarioNombre: reservaConflicto.usuario?.nombre || 'Sin asignar'
          } : null
        };
      });

      res.status(200).json({
        espacioId: parseInt(id as string),
        fecha: fecha as string,
        disponibilidad
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar disponibilidad' });
    }
  }
}

function calcularHoraFin(horaInicio: string): string {
  const [horas, minutos] = horaInicio.split(':').map(Number);
  const nuevaHora = horas + 2;
  return `${nuevaHora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

function hayConflictoHorario(
  inicioA: string, finA: string,
  inicioB: string, finB: string
): boolean {
  return inicioA < finB && finA > inicioB;
}