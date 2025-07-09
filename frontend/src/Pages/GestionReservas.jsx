import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Col, Card, Badge, Button, Form } from "react-bootstrap";
import { GeneralProvider } from "../Utils/GeneralContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ContenedorCartas from "../Components/ContenedorCartas";
import "../Styles/Gestion.css";


function GestionReserva() {
  const [reservas, setReserva] = useState([]);

  const obtenerReservas = async () => {
    try {
      const response = await fetch("http://localhost:3000/reservas");
      if (!response.ok)
        throw new Error("Error al obtener espacios reservados");
      const data = await response.json();
      setReserva(data);
    } catch (error) {
      console.error("Error al obtener espacios reservados:", error);
    }
  };

  //Actualizar el estado de un material
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("Pendiente");

  //Filtro
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroId, setFiltroId] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const reservasFiltradas = reservas.filter((reserva) => {
    const coincideEmail =
      filtroEmail === "" ||
      reserva.usuario.email.toLowerCase().includes(filtroEmail.toLowerCase());
    const coincideId = filtroId === "" || reserva.id.toString() === filtroId;
    const coincideEstado =
      filtroEstado === "" || reserva.estado === filtroEstado;
    return coincideEmail && coincideId && coincideEstado;
  });

  useEffect(() => {
    obtenerReservas();
  }, []);

  return (
    <>
      <Container fluid className="align-items-center m-0 p-0">
        <Row className="width-100vw">
          <Col xs={{ span: 8, offset: 2 }}>
            <Row width="100%" className="p-4 mb-2">
              <Col>
                <h1 className="text-center">Gestión de Reservas</h1>
                <div className="profileG-divider"></div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form className="formGM border rounded">
          <Row>
            <Col md={4}>
              <Form.Group controlId="filtroEmail">
                <Form.Label>Email del usuario</Form.Label>
                <Form.Control
                  className="placeH"
                  style={{ background: "white", color: "black" }}
                  type="text"
                  placeholder="ej. usuario@email.com"
                  value={filtroEmail}
                  onChange={(e) => setFiltroEmail(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="filtroId">
                <Form.Label>ID de reserva</Form.Label>
                <Form.Control
                  className="placeH"
                  style={{ background: "white", color: "black" }}
                  type="text"
                  placeholder="ej. 5"
                  value={filtroId}
                  onChange={(e) => setFiltroId(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="filtroEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  style={{ background: "white", color: "black" }}
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Devuelto">Devuelto</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Col className="materiales-lista centered ">
          {reservasFiltradas.map((reserva, index) => (
            <Card
              style={{ width: "275px", margin: "30px 20px"}}
              key={index}
              className="mb-3"
            >
              <Card.Header className="text-center">{reserva.id}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Reserva: </strong> {reserva.calendario.espacio.nombre}
                  <br />
                  <strong>Nombre: </strong> {reserva.usuario.nombre}
                  <br />
                  <strong>Fecha: </strong> {reserva.calendario.fecha}
                  <br />
                  <strong>Inicio: </strong> {reserva.calendario.horaInicio}
                  <br />
                  <strong>Fin: </strong> {reserva.calendario.horaFin}
                </Card.Text>
                <hr />
                <Card.Text><strong>Estado: </strong> <span style={{textTransform:"uppercase", letterSpacing:"2px"}}>{reserva.estado}</span></Card.Text>
              </Card.Body>

              <div className="text-center" style={{ marginBottom: "10px" }}>
                {reserva.estado === "completada" && (
                  <Button
                    variant="primary"
                    style={{ width: "150px" }}
                    className="oservaciones"
                    onClick={() => {
                      setReservaSeleccionada(reserva);
                      setMostrarModal(true);
                    }}
                  >
                    Observaciones
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </Col>
        <br />
        <br />
        <br />
        <br />
        <br />

      </Container>
    </>
  );
}

export default GestionReserva;
