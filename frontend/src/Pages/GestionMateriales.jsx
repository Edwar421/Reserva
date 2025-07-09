import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Col, Card, Badge, Button, Form } from "react-bootstrap";
import { GeneralProvider } from "../Utils/GeneralContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ContenedorCartas from "../Components/ContenedorCartas";
import "../Styles/Gestion.css";

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

  // Estados para “Actualizar estado”
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");

  // Estados para “Observaciones”
  const [mostrarModalObs, setMostrarModalObs] = useState(false);
  const [textoObs, setTextoObs] = useState("");

  // Filtros
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroId, setFiltroId] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const materialesFiltrados = materiales.filter((material) => {
    const coincideEmail =
      filtroEmail === "" ||
      material.usuario.email.toLowerCase().includes(filtroEmail.toLowerCase());
    const coincideId = filtroId === "" || material.id.toString() === filtroId;
    const coincideEstado =
      filtroEstado === "" || material.estado === filtroEstado;
    return coincideEmail && coincideId && coincideEstado;
  });

  useEffect(() => {
    obtenerMateriales();
  }, []);

  return (
    <>
      <Container fluid className="align-items-center m-0 p-0">
        <Row className="width-100vw">
          <Col xs={{ span: 8, offset: 2 }}>
            <Row width="100%" className="p-4 mb-2">
              <Col>
                <h1 className="text-center">Gestión de materiales</h1>
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

        <Col className="materiales-lista centered">
          {materialesFiltrados.map((material, index) => (
            <Card
              style={{ width: "275px", margin: "30px 20px" }}
              key={index}
              className="mb-1"
            >
              <Card.Header className="text-center">{material.id}</Card.Header>
              <Card.Body className="pb-4">
                <Card.Text>
                  <span className="trunkGM">
                    <strong>Material: </strong>
                    {material.material.nombre}
                  </span>
                  <br />
                  <strong>Nombre: </strong> {material.usuario.nombre}
                  <br />
                  <strong>Fecha: </strong> {material.fecha}
                  <br />
                  <strong>Inicio: </strong> {material.horaInicio}
                  <br />
                  <strong>Fin: </strong> {material.horaFin}
                  <br />
                  <strong>Observaciones: </strong>
                  {material.observacionesEntrega}
                </Card.Text>
                <hr />
                <Card.Text>
                  <strong>Estado: </strong>
                  <span style={{ textTransform: "uppercase", letterSpacing: "2px" }}>
                    {material.estado}
                  </span>
                </Card.Text>
              </Card.Body>
              <div className="text-center" style={{ paddingBottom: "20px" }}>
                {material.estado !== "Devuelto" && (
                  <Button
                    variant="primary"
                    style={{ width: "200px", boxShadow: "0 0 12px rgba(36, 63, 198, 0.51)" }}
                    className="actualizarEstado"
                    onClick={() => {
                      setReservaSeleccionada(material);
                      setNuevoEstado(material.estado);
                      setMostrarModal(true);
                    }}
                  >
                    Actualizar estado
                  </Button>
                )}
                {material.estado === "Devuelto" && (
                  <Button
                    variant="secondary"
                    style={{ width: "200px", boxShadow: "0 0 12px rgba(94, 95, 97, 0.53)" }}
                    className="observaciones"
                    onClick={() => {
                      setReservaSeleccionada(material);
                      setTextoObs(material.observacionesEntrega || "");
                      setMostrarModalObs(true);
                    }}
                  >
                    Observaciones
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </Col>

        {/* Modal: Actualizar Estado */}
        {mostrarModal && (
          <div className="modalOverlay">
            <div className="modalContent">
              <h5 className="titleUp text-center">
                Actualizar estado para la reserva #{reservaSeleccionada?.id}
              </h5>
              <Form.Select
                value={nuevoEstado}
                className="selectUp"
                onChange={(e) => setNuevoEstado(e.target.value)}
              >
                <option value="">Seleccione el estado</option>
                <option value="Entregado">Entregado</option>
                <option value="Devuelto">Devuelto</option>
              </Form.Select>
              <div className="mt-3 d-flex justify-content-evenly">
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
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
                      if (!response.ok) throw new Error("Error al actualizar el estado");
                      await obtenerMateriales();
                      setMostrarModal(false);
                      alert("Estado actualizado correctamente");
                    } catch (error) {
                      console.error("Error actualizando estado:", error);
                      alert("Error al actualizar el estado: " + error);
                    }
                  }}
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Observaciones */}
        {mostrarModalObs && (
          <div className="modalOverlay">
            <div className="modalContent">
              <h5 className="titleUp text-center">
                Agregar/Editar observación para reserva #{reservaSeleccionada?.id}
              </h5>
              <Form.Group className="mt-3">
                <Form.Label>Observaciones de entrega</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={textoObs}
                  onChange={(e) => setTextoObs(e.target.value)}
                />
              </Form.Group>
              <div className="mt-3 d-flex justify-content-evenly">
                <Button variant="secondary" onClick={() => setMostrarModalObs(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="success"
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `http://localhost:3000/reservas-material/observaciones/${reservaSeleccionada.id}`,
                        {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ observacionesEntrega: textoObs }),
                        }
                      );
                      if (!res.ok) throw new Error("Error al guardar observación");
                      await obtenerMateriales();
                      setMostrarModalObs(false);
                      alert("Observación guardada correctamente");
                    } catch (err) {
                      console.error("Error guardando observación:", err);
                      alert("Error guardando observación: " + err);
                    }
                  }}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default GestionMateriales;
