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

  //Actualizar el estado de un material
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("Pendiente");

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
                </Card.Text>
                  <hr />
                <Card.Text>
                  Estado: {material.estado}
                </Card.Text>
              </Card.Body>
              <div className="text-center" style={{ marginBottom: "10px" }}>
                <Button
                  variant="primary"
                  style={{ width: "150px" }}
                  className="actualizarEstado"
                  onClick={() => {
                    setReservaSeleccionada(material);
                    setNuevoEstado(material.estado); // inicia con el estado actual
                    setMostrarModal(true);
                  }}
                >
                  Actualizar estado
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
        /* Ventana emergente para actualizar el estado */
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5>
                Actualizar estado para la reserva #{reservaSeleccionada?.id}
              </h5>
              <Form.Select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Entregado">Entregado</option>
                <option value="Devuelto">Devuelto</option>
              </Form.Select>
              <div className="mt-3 d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="success"
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        `http://localhost:3000/reservas-material/estado/${reservaSeleccionada.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ estado: nuevoEstado }),
                        }
                      );
                      if (!response.ok)
                        throw new Error("Error al actualizar estado");
                      await obtenerMateriales(); // recarga la lista
                      setMostrarModal(false);
                    } catch (error) {
                      console.error("Error actualizando estado:", error);
                    }
                  }}
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </Container>
    </>
  );
}

export default GestionMateriales;
