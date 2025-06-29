import React from "react";
import { Col, Card, Badge } from "react-bootstrap";

function ComponenteReservaMaterial({
  nombre,
  cantidad,
  fecha,
  fechaLimite,
  horaInicio,
  horaFin,
  estado,
}) {

  const badgeColor =
    estado === "Devuelto"
      ? "success"
      : estado === "Pendiente"
      ? "danger"
      : "primary";

  return (
    <Col className="text-center centered">
      <Card
        style={{ width: "200px", height: "auto", margin: "auto" }}
        className={`custom-card ${!true ? "opacity-75" : ""}`}
      >
        <Card.Header className="text-center">
          <i className="fas fa-calendar-alt fa-2x text-primary"></i>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>{nombre}</strong>
            <br />
            {nombre && (
              <>
                <Badge bg="info" className="me-2">
                  {nombre}
                </Badge>
                <br />
              </>
            )}
            {cantidad && (
              <>
                <small>Cantidad: {cantidad} personas</small>
                <br />
              </>
            )}
            <Badge bg={badgeColor}>{estado}</Badge>
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
              <br />
              {fechaLimite && 
                    <small className="text-muted">Fecha de Devolución: {fechaLimite}</small>
                }
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ComponenteReservaMaterial;
