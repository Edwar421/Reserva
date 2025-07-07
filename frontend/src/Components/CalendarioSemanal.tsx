import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Button,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import ConfirmacionReserva from "./ConfirmacionReserva";
import "../Styles/Calendario.css"; // Asegúrate de tener estilos para la tabla

interface Props {
  idEspacio: number;
  nombreEspacio: string;
}

interface ReservaInfo {
  id: number;
  usuarioNombre: string;
  email: string;
}

interface DisponibilidadSlot {
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
  reservas?: ReservaInfo[];
  calendarioId: number;
  docenteAsignado: boolean;
}

interface DisponibilidadDia {
  fecha: string;
  dia: string;
  disponibilidad: DisponibilidadSlot[];
}

interface FechaSemana {
  fecha: string;
  dia: string;
  fechaCompleta: Date;
}

interface ReservaSeleccionada {
  espacioId: number;
  nombreEspacio: string;
  fecha: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  calendarioId: number;
}

const CalendarioSemanal: React.FC<Props> = ({ idEspacio, nombreEspacio }) => {
  const [semanaActual, setSemanaActual] = useState(0);
  const [disponibilidadSemana, setDisponibilidadSemana] = useState<
    DisponibilidadDia[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] =
    useState<ReservaSeleccionada | null>(null);

  const horariosBase = [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
  ];

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const obtenerFechasSemana = (semanaOffset: number = 0): FechaSemana[] => {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);

    const diaActual = hoy.getDay();
    const diasHastaLunes = diaActual === 0 ? -6 : 1 - diaActual;
    inicioSemana.setDate(hoy.getDate() + diasHastaLunes + semanaOffset * 7);

    const fechasSemana: FechaSemana[] = [];
    for (let i = 0; i < 6; i++) {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + i);
      fechasSemana.push({
        fecha: fecha.toISOString().split("T")[0],
        dia: diasSemana[i],
        fechaCompleta: fecha,
      });
    }
    return fechasSemana;
  };

  const cargarDisponibilidadSemana = async () => {
    try {
      setLoading(true);
      setError(null);
      const fechasSemana = obtenerFechasSemana(semanaActual);
      const disponibilidadPromesas = fechasSemana.map(
        async ({ fecha, dia }) => {
          const response = await fetch(
            `http://localhost:3000/reservas/disponibilidad/${idEspacio}?fecha=${fecha}`
          );
          if (!response.ok) throw new Error("Error al cargar disponibilidad");
          const data = await response.json();
          return {
            fecha,
            dia,
            disponibilidad: data.disponibilidad,
          };
        }
      );
      const resultados = await Promise.all(disponibilidadPromesas);
      setDisponibilidadSemana(resultados);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idEspacio) {
      cargarDisponibilidadSemana();
    }
  }, [idEspacio, semanaActual]);

  const handleReservarHorario = async (
    fecha: string,
    dia: string,
    horaInicio: string,
    horaFin: string,
    calendarioId: number
  ) => {
    setReservaSeleccionada({
      espacioId: idEspacio,
      nombreEspacio,
      fecha,
      dia,
      horaInicio,
      horaFin,
      calendarioId,
    });
    setShowModal(true);
    return true;
  };
  //Calendario

  const [capacidadEspacio, setCapacidad] = useState("");
  const [idCalendarioCreado, setIdCalendario] = useState(null);
  const obtenerCapacidaEspacio = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/espacios/${idEspacio}`
      );
      if (!response.ok) throw new Error("Error el epacio");
      const json = await response.json();
      const espacio = json;
      return espacio.capacidad;
    } catch (error) {
      console.error("Error al obtener la capacidad del espacio: ", error);
    }
  };

  const handleCrearCalendario = async (fecha, horaInicio, horaFin) => {
    try {
      const cantidad = await obtenerCapacidaEspacio();
      const response = await fetch("http://localhost:3000/calendario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: fecha,
          horaInicio: horaInicio,
          horaFin: horaFin,
          capacidad: cantidad,
          disponibilidad: true,
          espacioId: idEspacio,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const idCalendario = data.id;
        setIdCalendario(idCalendario);
        return idCalendario;
        //await cargarDisponibilidadSemana();
      } else {
        const error = await response.json();
        alert(`Error calendario: ${error.error}`);
      }
    } catch (err) {
      alert("Error al crear el calendario");
    }
  };

  const handleConfirmarReserva = async () => {
    if (!reservaSeleccionada) return;
    try {
      const response = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calendarioId: reservaSeleccionada.calendarioId,
          usuarioId: localStorage.getItem("email"),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setReservaSeleccionada(null);
        await cargarDisponibilidadSemana();
        alert("Reserva creada exitosamente");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      alert("Error al crear la reserva");
    }
  };

  const cambiarSemana = (direccion: number) => {
    setSemanaActual((prev) => Math.max(0, prev + direccion));
  };

  const formatearRangoSemana = () => {
    const fechas = obtenerFechasSemana(semanaActual);
    const inicio = fechas[0].fechaCompleta.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
    const fin = fechas[5].fechaCompleta.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${inicio} - ${fin}`;
  };

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  const tipoUsuario = String(localStorage.getItem("tipoUsuario"));

  return (
    <>
      <Card className="mt-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Disponibilidad Semanal - {nombreEspacio}</h5>
            <small className="text-muted">{formatearRangoSemana()}</small>
          </div>
          <div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => cambiarSemana(-1)}
              disabled={semanaActual === 0}
              className="me-2"
            >
              ← Semana Anterior
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => cambiarSemana(1)}
            >
              Semana Siguiente →
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Cargando disponibilidad semanal...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table bordered hover size="sm" className="tabla-horario">
                <thead className="table-light">
                  <tr>
                    <th>Horario</th>
                    {disponibilidadSemana.map((dia) => (
                      <th key={dia.fecha}>{dia.dia}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horariosBase.map((hora) => {
                    const horaFin = calcularHoraFin(hora);
                    return (
                      <tr key={hora}>
                        <td>
                          <strong>
                            {hora} - {horaFin}
                          </strong>
                        </td>
                        {disponibilidadSemana.map((dia) => {
                          const slot = dia.disponibilidad.find(
                            (s) => s.horaInicio === hora
                          );

                          const slotDateTime = new Date(`${dia.fecha}T${hora}`);
                          const ahora = new Date();
                          const esPasado = slotDateTime < ahora;
                          var idcale;
                          if (esPasado) {
                            return <td>No disponible</td>;
                          }

                          if (!slot) {
                            return (
                              <td
                                key={`${dia.fecha}-${hora}`}
                                className="disponible"
                                onClick={async () => {
                                  const idCalendario =
                                    await handleCrearCalendario(
                                      dia.fecha,
                                      hora,
                                      horaFin
                                    );
                                  await handleReservarHorario(
                                    dia.fecha,
                                    dia.dia,
                                    hora,
                                    horaFin,
                                    Number(idCalendario)
                                  );
                                }}
                              >
                                Disponible
                              </td>
                            );
                          }

                          const idCalendario = slot.calendarioId;
                          return (
                            <td
                              key={`${dia.fecha}-${hora}`}
                              className={
                                tipoUsuario !== "Profesor"
                                  ? slot.disponible
                                    ? "disponible"
                                    : "ocupado"
                                  : slot.docenteAsignado==null
                                  ? "disponible"
                                  : "ocupado"
                              }
                              onClick={async () =>
                                slot.disponible &&
                                (await handleReservarHorario(
                                  dia.fecha,
                                  dia.dia,
                                  hora,
                                  horaFin,
                                  idCalendario
                                ))
                              }
                            >
                              {tipoUsuario !== "Profesor"
                                ? slot.disponible
                                  ? "Disponible"
                                  : "ocupado"
                                : slot.docenteAsignado==null
                                ? "Diponible"
                                : "ocupado"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <ConfirmacionReserva
        show={showModal}
        onHide={() => setShowModal(false)}
        reserva={reservaSeleccionada}
        onConfirmar={handleConfirmarReserva}
      />
    </>
  );
};

function calcularHoraFin(horaInicio: string): string {
  const [horas, minutos] = horaInicio.split(":").map(Number);
  const nuevaHora = horas + 2;
  return `${nuevaHora.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;
}

export default CalendarioSemanal;
