import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Alert, Spinner, Table } from 'react-bootstrap';
import ConfirmacionReserva from './ConfirmacionReserva';
import '../Styles/Calendario.css'; // Asegúrate de tener estilos para la tabla

interface Props {
  idEspacio: number;
  nombreEspacio: string;
}

interface DisponibilidadSlot {
  hora: string;
  horaFin: string;
  disponible: boolean;
  reserva?: {
    id: number;
    usuarioNombre: string;
  };
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
}

const CalendarioSemanal: React.FC<Props> = ({ idEspacio, nombreEspacio }) => {
  const [semanaActual, setSemanaActual] = useState(0);
  const [disponibilidadSemana, setDisponibilidadSemana] = useState<DisponibilidadDia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<ReservaSeleccionada | null>(null);

  const horariosBase = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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
        fecha: fecha.toISOString().split('T')[0],
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
      const disponibilidadPromesas = fechasSemana.map(async ({ fecha, dia }) => {
        const response = await fetch(`http://localhost:3000/reservas/disponibilidad/${idEspacio}?fecha=${fecha}`);
        if (!response.ok) throw new Error('Error al cargar disponibilidad');
        const data = await response.json();
        return {
          fecha,
          dia,
          disponibilidad: data.disponibilidad,
        };
      });
      const resultados = await Promise.all(disponibilidadPromesas);
      setDisponibilidadSemana(resultados);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idEspacio) {
      cargarDisponibilidadSemana();
    }
  }, [idEspacio, semanaActual]);

  const handleReservarHorario = (fecha: string, dia: string, horaInicio: string, horaFin: string) => {
    setReservaSeleccionada({
      espacioId: idEspacio,
      nombreEspacio,
      fecha,
      dia,
      horaInicio,
      horaFin,
    });
    setShowModal(true);
  };

  const handleConfirmarReserva = async () => {
    if (!reservaSeleccionada) return;
    try {
      const response = await fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          espacioId: reservaSeleccionada.espacioId,
          fecha: reservaSeleccionada.fecha,
          horaInicio: reservaSeleccionada.horaInicio,
          horaFin: reservaSeleccionada.horaFin,
          usuarioId: localStorage.getItem("email"),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setReservaSeleccionada(null);
        await cargarDisponibilidadSemana();
        alert('Reserva creada exitosamente');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      alert('Error al crear la reserva');
    }
  };

  const cambiarSemana = (direccion: number) => {
    setSemanaActual((prev) => Math.max(0, prev + direccion));
  };

  const formatearRangoSemana = () => {
    const fechas = obtenerFechasSemana(semanaActual);
    const inicio = fechas[0].fechaCompleta.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
    });
    const fin = fechas[5].fechaCompleta.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return `${inicio} - ${fin}`;
  };

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

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
            <Button variant="outline-primary" size="sm" onClick={() => cambiarSemana(1)}>
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
          ) : disponibilidadSemana.length > 0 ? (
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
                        <td><strong>{hora} - {horaFin}</strong></td>
                        {disponibilidadSemana.map((dia) => {
                          const slot = dia.disponibilidad.find((s) => s.hora === hora);
                          if (!slot) {
                            return <td key={`${dia.fecha}-${hora}`} className="no-disponible">—</td>;
                          }
                          return (
                            <td
                              key={`${dia.fecha}-${hora}`}
                              className={slot.disponible ? 'disponible' : 'ocupado'}
                              onClick={() =>
                                slot.disponible &&
                                handleReservarHorario(dia.fecha, dia.dia, hora, horaFin)
                              }
                            >
                              {slot.disponible ? 'Libre' : slot.reserva?.usuarioNombre || 'Ocupado'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

            </div>
          ) : (
            <Alert variant="info">No hay datos de disponibilidad para mostrar</Alert>
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
  const [horas, minutos] = horaInicio.split(':').map(Number);
  const nuevaHora = horas + 2;
  return `${nuevaHora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

export default CalendarioSemanal;
