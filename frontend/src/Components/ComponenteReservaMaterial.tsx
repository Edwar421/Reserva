import React from "react";
import { Col, Card, Badge } from "react-bootstrap";

import "../Styles/Card.css";


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
        style={{ width: "250px", height: "auto", margin: "0 auto 20px" }}
        className={`custom-card ${!true ? "opacity-75" : ""}`}
      >
        <Card.Header className="text-center">
          <i className="fas fa-calendar-alt fa-2x text-primary"></i>
        </Card.Header>
        <Card.Body >
          <Card.Text>
            <span className="trunk"><strong>{nombre}</strong></span>
            <br />
            {cantidad && (
              <>
                <small>Cantidad: {cantidad}</small>
                <br />
              </>
            )}
            <Badge bg={badgeColor} style={{textTransform:"uppercase", boxShadow: "0 0 8px rgba(235, 8, 8, 0.98)", marginTop:"3px"}}>{estado}</Badge>
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
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ComponenteReservaMaterial;
