import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReservaMaterialDto {
  @IsNotEmpty()
  @IsNumber()
  materialId: number;

  @IsOptional()
  @IsNumber()
  usuarioId?: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsString()
  fecha: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  horaInicio: string; // HH:mm

  @IsOptional()
  @IsString()
  horaFin: string; // HH:mm
}
