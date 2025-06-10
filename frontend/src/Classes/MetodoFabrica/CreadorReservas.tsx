import Contenedor from "./Contenedor";
import Creador from "./Creador";
import ContenedorReservas from "./ContenedorReservas";

class CreadorReservas extends Creador {
  crearContenedor(): Contenedor {
    return new ContenedorReservas();
  }
}

export default CreadorReservas;