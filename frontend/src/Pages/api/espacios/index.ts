import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../../../backend/src/database/AppDataSource';
import { Espacio } from '../../../../../backend/src/database/Entidades/espacio.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const espacioRepo = AppDataSource.getRepository(Espacio);

  switch (req.method) {
    case 'GET':
      try {
        const { tipo, capacidadMinima } = req.query;
        let query = espacioRepo.createQueryBuilder('espacio');

        if (tipo) {
          query.andWhere('espacio.tipo = :tipo', { tipo });
        }

        if (capacidadMinima) {
          query.andWhere('espacio.capacidad >= :capacidad', { 
            capacidad: parseInt(capacidadMinima as string) 
          });
        }

        const espacios = await query.getMany();
        res.status(200).json(espacios);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener espacios' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}