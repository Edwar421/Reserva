export interface EspacioDisponible {
  id: number;
  nombre: string;
  tipo: string;
  capacidad: number;
  descripcion?: string;
}

export interface ReservaExistente {
  id: number;
  espacioId: number;
  espacioNombre: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  usuarioNombre?: string;
}

export interface DisponibilidadHorario {
  hora: string;
  disponible: boolean;
  reservaId?: number;
}

export interface FiltrosReserva {
  tipoEspacio?: string;
  capacidadMinima?: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
}