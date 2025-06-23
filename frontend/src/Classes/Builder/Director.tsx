import Carta from "./Carta";
import { BuilderConcreto } from "./BuilderConcreto";

class Director {
  private builder: BuilderConcreto;

  constructor(propiedades: {
    nombre: string;
    tipo?: string;
    capacidad?: number;
    descripcion?: string;
    cantidad?: number;
    disponible?: boolean;
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
  }) {
    this.builder = new BuilderConcreto();
    this.builder.construirParte(propiedades);
    this.builder.crearCarta();
  }

  construir(): Carta {
    return this.builder.getResultado();
  }
}

export default Director;