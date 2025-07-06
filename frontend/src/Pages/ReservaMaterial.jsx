import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ThemeSwitcher from "../Components/ThemeSwitcher";
import { GeneralProvider } from "../Utils/GeneralContext";
import axios from "axios"; // Necesario para consultar la API

import "../Styles/Catalogo.css";

function ReservaMaterial() {
  const [materiales, setMateriales] = useState([]);
  const [materialSeleccionado, setMaterialSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidad] = useState(null);
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    // Cargar materiales desde la API
    axios
      .get("http://localhost:3000/materiales") // Asegúrate de tener este endpoint
      .then((res) => setMateriales(res.data))
      .catch((err) => console.error("Error cargando materiales:", err));
  }, []);

  const handleConfirmarReservaMaterial = async () => {
    if (!materialSeleccionado || !fecha || !cantidadSeleccionada) {
      alert("Por favor complete todos los campos para realizar la reserva");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/reservas-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: materialSeleccionado,
          usuarioId: localStorage.getItem("email"),
          cantidad: cantidadSeleccionada,
          fecha: fecha,
          fechaReserva: new Date(),
          estado: "pendiente",
        }),
      });

      if (response.ok) {
        // setShowModal(false);
        alert("Reserva creada exitosamente");
        window.location.reload();
        // await cargarDisponibilidadSemana();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      alert("Error al crear la reserva:" + err);
    }
    setReservaSeleccionada("");
    setCantidad(null);
    setFecha("");
  };

  return (
    <Container fluid className="align-items-center m-0 p-0">
      <Row className="width-100vw">
        <Col xs={{ span: 8, offset: 2 }}>
          <Row className="p-5">
            <Col className="centered">
              <img src="/logo.png" alt="Logo" fluid width="22%" />
            </Col>
            <Col>
              <br />
              <h1>Préstamo de Material</h1>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="px-5">
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className="text-center mb-4">Selecciona un material</h3>
          <select
            className="form-control"
            value={materialSeleccionado}
            onChange={(e) => setMaterialSeleccionado(e.target.value)}
          >
            <option value="">-- Seleccionar material --</option>
            {materiales.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.nombre}
              </option>
            ))}
          </select>

          {materialSeleccionado && (
            <div className="mt-4 text-center">
              {(() => {
                const material = materiales.find(
                  (m) => m.id === parseInt(materialSeleccionado)
                );
                const hoy = new Date().toISOString().split("T")[0];
                const fechaMax = new Date(hoy);
                fechaMax.setDate(fechaMax.getDate() + 7);
                const fechaMaxStr = fechaMax.toISOString().split("T")[0];
                return material ? (
                  material.cantidadDisponible < 1 ? (
                    <p>
                      No hay unidades disponibles, consulte en otro momento.
                    </p>
                  ) : (
                    <>
                      <p>
                        Material seleccionado:{" "}
                        <strong>{material.nombre}</strong> (
                        {material.cantidadDisponible} unidades disponibles)
                      </p>
                      Selecciona la cantidad que desas reservar:{" "}
                      <input
                        type="number"
                        name="cantidad"
                        min={1}
                        max={material.cantidadDisponible}
                        step={1}
                        value={cantidadSeleccionada}
                        onChange={(e) => {
                          let value = parseInt(e.target.value, 10);
                          if (isNaN(value)) value = "";
                          else {
                            if (value < 1) value = 1;
                            if (value > material.cantidadDisponible)
                              value = material.cantidadDisponible;
                          }
                          setCantidad(value);
                        }}
                      />
                      <p>
                        Fecha:{" "}
                        <input
                          type="date"
                          value={fecha}
                          min={hoy}
                          max={fechaMaxStr}
                          onChange={(e) => setFecha(e.target.value)}
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      </p>
                      <hr />
                      <button
                        className="btn btn-primary"
                        onClick={handleConfirmarReservaMaterial}
                      >
                        Confirmar Préstamo
                      </button>
                    </>
                  )
                ) : (
                  <p>Material no encontrado.</p>
                );
              })()}
            </div>
          )}
        </Col>
      </Row>

      <GeneralProvider>{/* contexto general si aplica */}</GeneralProvider>

      <ThemeSwitcher />

      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}

export default ReservaMaterial;
