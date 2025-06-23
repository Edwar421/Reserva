import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EstadoReserva,
  Reserva,
} from '../../../database/Entidades/reserva.entity';
import { Repository } from 'typeorm';
import { CreateReservaDto } from '../dto/create.dto';
import { UpdateReservaDto } from '../dto/update.dto';
import { Espacio } from '../../../database/Entidades/espacio.entity';
import { Usuario } from '../../../database/Entidades/usuario.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Espacio)
    private readonly espacioRepository: Repository<Espacio>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateReservaDto) {
    const espacio = await this.espacioRepository.findOne({
      where: { id: dto.espacioId },
    });
    const usuario = await this.usuarioRepository.findOne({
      where: { email: dto.usuarioId },
    });

    const reserva = this.reservaRepository.create({
      fecha: dto.fecha,
      horaInicio: dto.horaInicio,
      horaFin: dto.horaFin,
      espacio,
      usuario,
    });

    return this.reservaRepository.save(reserva);
  }

  findAll() {
    return this.reservaRepository.find({ relations: ['espacio', 'usuario'] });
  }

  findOne(id: number) {
    return this.reservaRepository.findOne({
      where: { id },
      relations: ['espacio', 'usuario'],
    });
  }

  async findByEmail(email: string) {
    return this.reservaRepository.find({
      where: {
        usuario: { email },
      },
      relations: ['espacio', 'usuario'],
    });
  }

  async update(id: number, dto: UpdateReservaDto) {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) return null;

    if (dto.espacioId) {
      reserva.espacio = await this.espacioRepository.findOne({
        where: { id: dto.espacioId },
      });
    }
    if (dto.usuarioId) {
      reserva.usuario = await this.usuarioRepository.findOne({
        where: { email: dto.usuarioId },
      });
    }

    reserva.fecha = dto.fecha ?? reserva.fecha;
    reserva.horaInicio = dto.horaInicio ?? reserva.horaInicio;
    reserva.horaFin = dto.horaFin ?? reserva.horaFin;

    return this.reservaRepository.save(reserva);
  }

  async getDisponibilidadPorEspacioYFecha(espacioId: number, fecha: string) {
    const reservas = await this.reservaRepository.find({
      where: {
        espacio: { id: espacioId },
        fecha,
        estado: EstadoReserva.ACTIVA,
      },
      relations: ['usuario'],
    });

    const horariosBase = [
      '06:00',
      '08:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
    ];

    const disponibilidad = horariosBase.map((hora) => {
      const reserva = reservas.find((r) => r.horaInicio === hora);
      if (reserva) {
        return {
          hora,
          horaFin: reserva.horaFin,
          disponible: false,
          reserva: {
            id: reserva.id,
            usuarioNombre: reserva.usuario?.nombre || 'Desconocido',
          },
        };
      } else {
        return {
          hora,
          horaFin: this.calcularHoraFin(hora),
          disponible: true,
        };
      }
    });

    return { disponibilidad };
  }

  private calcularHoraFin(horaInicio: string): string {
    const [horas, minutos] = horaInicio.split(':').map(Number);
    const nuevaHora = horas + 2;
    return `${nuevaHora.toString().padStart(2, '0')}:${minutos
      .toString()
      .padStart(2, '0')}`;
  }

  remove(id: number) {
    return this.reservaRepository.delete(id);
  }
}
