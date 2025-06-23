import Director from "../Classes/Builder/Director";
import "../Styles/Carta.css";

function ComponenteReserva({ nombre, tipo, capacidad, descripcion, cantidad, disponible, fecha, horaInicio, horaFin }) {
  const director = new Director({ nombre, tipo, capacidad, descripcion, cantidad, disponible, fecha, horaInicio, horaFin });
  const carta = director.construir();

  return carta.getCreateCol();
}

export default ComponenteReserva;