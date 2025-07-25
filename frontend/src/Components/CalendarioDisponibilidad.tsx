import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useDisponibilidad } from '../hooks/useDisponibilidad';

interface Props {
  idEspacio: number;
}

const CalendarioDisponibilidad: React.FC<Props> = ({ idEspacio }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const { disponibilidad, loading, error } = useDisponibilidad(
    idEspacio,
    fechaSeleccionada
  );

  const reservarHorario = async (hora: string, horaFin: string) => {
    try {
      // Llamada al endpoint /reservas (proxy en package.json -> localhost:3000)
      const response = await fetch('/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          espacioId: idEspacio,
          fecha: fechaSeleccionada,
          horaInicio: hora,
          horaFin: horaFin,
        }),
      });

      // Lee como texto para depurar si no es JSON
      const text = await response.text();
      let payload: any;
      try {
        payload = JSON.parse(text);
      } catch {
        console.error('Respuesta no-JSON de /reservas:', text);
        throw new Error('Respuesta inesperada del servidor');
      }

      if (response.ok) {
        alert('Reserva creada exitosamente');
        // Aquí podrías refrescar disponibilidad (p.ej. forzar re-fetch)
      } else {
        alert(`Error: ${payload.error || 'desconocido'}`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear la reserva');
    }
  };

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Card className="mt-4">
      <Card.Header>
        <h5>Disponibilidad del Espacio</h5>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="form-control mt-2"
          min={new Date().toISOString().split('T')[0]}
        />
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando disponibilidad...</p>
          </div>
        ) : disponibilidad ? (
          <Row>
            {disponibilidad.disponibilidad.map((slot, idx) => (
              <Col key={idx} md={6} className="mb-3">
                <Card
                  className={`h-100 ${
                    !slot.disponible ? 'bg-light border-danger' : 'border-success'
                  }`}
                >
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>
                        {slot.hora} - {slot.horaFin}
                      </strong>
                      <Badge bg={slot.disponible ? 'success' : 'danger'}>
                        {slot.disponible ? 'Disponible' : 'Ocupado'}
                      </Badge>
                    </div>

                    {!slot.disponible && slot.reserva && (
                      <small className="text-muted mb-2">
                        Reservado por: {slot.reserva.usuarioNombre}
                      </small>
                    )}

                    {slot.disponible && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => reservarHorario(slot.hora, slot.horaFin)}
                        className="mt-auto"
                      >
                        Reservar
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info">
            Seleccione una fecha para ver la disponibilidad
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default CalendarioDisponibilidad;
