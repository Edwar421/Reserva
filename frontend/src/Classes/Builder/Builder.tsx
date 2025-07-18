import Carta from "./Carta";

export abstract class Builder {
  protected carta: Carta;

  constructor() {
    this.carta = new Carta();
  }

  abstract construirParte(propiedades: {
    nombre: string;
    tipo?: string;
    capacidad?: number;
    descripcion?: string;
    cantidad?: number;
    disponible?: boolean;
    fecha?: string;
    horaInicio?: string;  
    horaFin?: string;
  }): void;

  getCarta(): Carta {
    return this.carta;
  }
}