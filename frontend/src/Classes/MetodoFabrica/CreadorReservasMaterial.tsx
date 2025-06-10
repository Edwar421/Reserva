import Contenedor from "./Contenedor";
import Creador from "./Creador";
import ContenedorReservasMaterial from "./ContenedorReservasMaterial";

class CreadorReservasMaterial extends Creador {
  crearContenedor(): Contenedor {
    return new ContenedorReservasMaterial();
  }
}

export default CreadorReservasMaterial;