import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsNumber()
  espacioId: number;

  @IsNotEmpty()
  @IsNumber()
  usuarioId: string;

  @IsNotEmpty()
  @IsDateString()
  fecha: string; // 'YYYY-MM-DD'

  @IsNotEmpty()
  @IsString()
  horaInicio: string; // 'HH:mm'

  @IsNotEmpty()
  @IsString()
  horaFin: string; // 'HH:mm'
}
