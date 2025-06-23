import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Col, Card, Badge, Button, Form } from "react-bootstrap";
import { GeneralProvider } from "../Utils/GeneralContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ContenedorCartas from "../Components/ContenedorCartas";
import "../Styles/Catalogo.css";

function GestionMateriales() {
  const [materiales, setMateriales] = useState([]);

  const obtenerMateriales = async () => {
    try {
      const response = await fetch("http://localhost:3000/reservas-material");
      if (!response.ok)
        throw new Error("Error al obtener materiales reservados");
      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      console.error("Error al obtener materiales reservados:", error);
    }
  };
  useEffect(() => {
    obtenerMateriales();
  }, []);

  return (
    <>
      <Container fluid className="align-items-center m-0 p-0">
        <Row className="width-100vw">
          <Header />
        </Row>

        <Row className="width-100vw">
          <Col xs={{ span: 8, offset: 2 }}>
            <Row width="100%" className="p-5">
              <Col>
                <h1>Gestión de materiales</h1>
              </Col>
            </Row>
          </Col>
        </Row>

        <Col className="materiales-lista centered">
          {materiales.map((material, index) => (
            <Card
              style={{ width: "250px", margin: "10px" }}
              key={index}
              className="mb-3"
            >
              <Card.Header className="text-center">{material.id}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Material: {material.material.nombre}
                  <br />
                  Nombre: {material.usuario.nombre}
                  <br />
                  Fecha: {material.fecha}
                  <br />
                  Inicio: {material.horaInicio}
                  <br />
                  Fin: {material.horaFin}
                  <hr />
                  Estado: {material.estado}
                </Card.Text>
              </Card.Body>
              <div className="text-center" style={{ marginBottom: "10px" }}>
                <Button variant="primary" style={{ width: "150px" }}>
                  Actualizar
                </Button>
              </div>
            </Card>
          ))}
        </Col>

        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </Container>
    </>
  );
}

export default GestionMateriales;
