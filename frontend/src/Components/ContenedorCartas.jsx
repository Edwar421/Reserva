import CreadorReservas from "../Classes/MetodoFabrica/CreadorReservas";
import CreadorReservasMaterial from "../Classes/MetodoFabrica/CreadorReservasMaterial";

// eslint-disable-next-line react/prop-types
function ContenedorCartas({ tipo }) {
  const creador = tipo === "espacios" ? new CreadorReservas() : new CreadorReservasMaterial();
  const producto = creador.crearContenedor();

  return <>{producto.render()}</>;
}

export default ContenedorCartas;