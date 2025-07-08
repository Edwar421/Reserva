import React from "react";
import { Col, Card, Badge } from "react-bootstrap";

function ComponenteReserva({
  nombre,
  tipo,
  capacidad,
  descripcion,
  cantidad,
  disponible,
  fecha,
  horaInicio,
  horaFin,
}) {
  const estado = disponible;

  const badgeColor =
    estado === "activa"
      ? "success"
      : estado === "cancelada"
      ? "danger"
      : "primary";

  return (
    <Col className="text-center centered">
      <Card
        style={{ width: "250px", height: "auto", margin: "0 auto 40px" }}
        className={`custom-card ${!disponible ? "opacity-75" : ""}`}
      >
        <Card.Header className="text-center">
          <i className="fas fa-calendar-alt fa-2x text-primary"></i>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{}} >
            <strong>{nombre}</strong>
            <br />
            {tipo && (
              <>
                <Badge 
                  bg="info" 
                  style={{ textTransform: "uppercase",  
                    boxShadow: "0 0 8px rgba(52, 190, 211, 0.5)", 
                    marginBottom:"10px",
                    transform: "translateX(2%)"
                  }} 
                  className="me-2">
                  {tipo}
                </Badge>
                <br />
              </>
            )}
            {capacidad && (
              <>
                <small>Capacidad: {capacidad} personas</small>
                <br />
              </>
            )}
            {cantidad !== undefined && (
              <>
                <small>Cantidad disponible: {cantidad}</small>
                <br />
              </>
            )}
            {descripcion && <small className="text-muted">{descripcion}</small>}
            <br />
            <Badge bg={badgeColor} style={{ textTransform: "uppercase", boxShadow: "0 0 8px rgba(52, 211, 57, 0.5)"}}>{estado}</Badge>
            <hr />
            
              <small>Horario</small>
              <br />
              <small className="text-muted">{fecha}</small>
              <br />
              {horaInicio && (
                <>
                  <small className="text-muted">{horaInicio}</small> -{" "}
                </>
              )}
              {horaFin && <small className="text-muted">{horaFin}</small>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ComponenteReserva;
