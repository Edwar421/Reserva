import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservaService } from '../servicios/reserva.services';
import { CreateReservaDto } from '../dto/create.dto';
import { UpdateReservaDto } from '../dto/update.dto';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }
  @Get('disponibilidad/:idEspacio')
  async getDisponibilidad(
    @Param('idEspacio') idEspacio: number,
    @Query('fecha') fecha: string,
  ) {
    return this.reservaService.getDisponibilidadPorEspacioYFecha(idEspacio, fecha);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(+id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
