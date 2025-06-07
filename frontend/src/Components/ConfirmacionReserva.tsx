import React from 'react';
import { Modal, Button, Alert, Row, Col } from 'react-bootstrap';

interface ReservaSeleccionada {
  espacioId: number;
  nombreEspacio: string;
  fecha: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

interface Props {
  show: boolean;
  onHide: () => void;
  reserva: ReservaSeleccionada | null;
  onConfirmar: () => void;
}

const ConfirmacionReserva: React.FC<Props> = ({ show, onHide, reserva, onConfirmar }) => {
  if (!reserva) return null;

  const formatearFecha = (fecha: string) => {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="bi bi-calendar-check me-2"></i>
          Confirmar Reserva
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Alert variant="info" className="mb-4">
          <strong>¿Está seguro de que desea realizar esta reserva?</strong>
        </Alert>

        <div className="reservation-details">
          <Row className="mb-3">
            <Col sm={4}>
              <strong>Espacio:</strong>
            </Col>
            <Col sm={8}>
              <span className="text-primary fw-bold">{reserva.nombreEspacio}</span>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4}>
              <strong>Fecha:</strong>
            </Col>
            <Col sm={8}>
              <span>{formatearFecha(reserva.fecha)}</span>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4}>
              <strong>Horario:</strong>
            </Col>
            <Col sm={8}>
              <span className="badge bg-success fs-6">
                {reserva.horaInicio} - {reserva.horaFin}
              </span>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4}>
              <strong>Duración:</strong>
            </Col>
            <Col sm={8}>
              <span>2 horas</span>
            </Col>
          </Row>
        </div>

        <Alert variant="warning" className="mt-4">
          <small>
            <strong>Nota:</strong> Una vez confirmada, la reserva quedará registrada en el sistema. 
            Asegúrese de que los datos sean correctos antes de continuar.
          </small>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          <i className="bi bi-x-circle me-1"></i>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirmar}>
          <i className="bi bi-check-circle me-1"></i>
          Confirmar Reserva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmacionReserva;