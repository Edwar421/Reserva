import { useEffect, useState } from "react";

function CalendarioDisponibilidad({ idEspacio }) {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (!idEspacio) return;
    
    // Llamada a la API para obtener las reservas de un espacio
    fetch(`/api/reservas/${idEspacio}`)
      .then(res => res.json())
      .then(data => setReservas(data))
      .catch(err => console.error("Error cargando reservas", err));
  }, [idEspacio]);

  const horarios = ["08:00", "10:00", "12:00", "14:00", "16:00"];
  const fecha = "2025-05-07"; // Fijo para el ejemplo

  return (
    <div className="p-3">
      <h5>Disponibilidad del {fecha}</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(hora => {
            const ocupada = reservas.some(r => r.horaInicio === hora);
            return (
              <tr key={hora}>
                <td>{hora}</td>
                <td className={ocupada ? "bg-danger text-white" : "bg-success text-white"}>
                  {ocupada ? "Ocupado" : "Disponible"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CalendarioDisponibilidad;
