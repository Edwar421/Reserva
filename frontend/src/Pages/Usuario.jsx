import React from "react";
import { Row } from "react-bootstrap";

function Usuario() {
  const nombre = localStorage.getItem("username");
    const correo = localStorage.getItem("email");
  return (
    <Row >
      Usuario: {nombre}
        <br />
      Correo: {correo}
    </Row>
  );
}

export default Usuario;
