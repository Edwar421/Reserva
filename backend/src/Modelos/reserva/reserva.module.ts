import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from '../../database/Entidades/reserva.entity';
import { Espacio } from '../../database/Entidades/espacio.entity';
import { Usuario } from '../../database/Entidades/usuario.entity';
import { ReservaService } from '../reserva/servicios/reserva.services';
import { ReservaController } from './controladores/reserva.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Espacio, Usuario])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
