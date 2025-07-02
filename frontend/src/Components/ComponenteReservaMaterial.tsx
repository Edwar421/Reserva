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
      : estado === "Pendiente" || estado === "Atrasado"
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
            {cantidad && (
              <>
                <small>Cantidad: {cantidad}</small>
                <br />
              </>
            )}
            <Badge bg={badgeColor}>{estado}</Badge>
            <hr />
              <small>Horario</small>
              <br />
              {fecha && 
                    <small className="text-muted">Fecha de inicio: {new Date(fecha).toLocaleDateString()}</small>
                }
                <br />
               {fechaLimite && 
                    <small className="text-muted">Fecha limite: {new Date(fechaLimite).toLocaleDateString()}</small>
                }
              <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ComponenteReservaMaterial;
