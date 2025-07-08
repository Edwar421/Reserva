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

  const shadowColors = {
    success: "0 0 8px rgba(25, 135, 84, 0.98)",   
    danger: "0 0 8px rgba(220, 53, 69, 0.98)",    
    primary: "0 0 8px rgba(13, 110, 253, 0.98)"   

    };

  const boxShadowColor = shadowColors[badgeColor];

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
            <Badge bg={badgeColor} style={{textTransform:"uppercase", boxShadow: boxShadowColor, marginTop:"3px"}}>{estado}</Badge>
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
