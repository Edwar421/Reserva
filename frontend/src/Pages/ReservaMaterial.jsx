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

  useEffect(() => {
    // Cargar materiales desde la API
    axios
      .get("http://localhost:3000/materiales") // Asegúrate de tener este endpoint
      .then((res) => setMateriales(res.data))
      .catch((err) => console.error("Error cargando materiales:", err));
  }, []);

  return (
    <Container fluid className="align-items-center m-0 p-0">
      <Row className="width-100vw">
        <Header />
      </Row>

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
                {mat.nombre} (Disponibles: {mat.cantidad})
              </option>
            ))}
          </select>

          {materialSeleccionado && (
            <div className="mt-4 text-center">
              <p>
                Material seleccionado:{" "}
                <strong>
                  {
                    materiales.find((m) => m.id === parseInt(materialSeleccionado))
                      ?.nombre
                  }
                </strong>
              </p>
              <button className="btn btn-primary">Confirmar Préstamo</button>
            </div>
          )}
        </Col>
      </Row>

      <GeneralProvider>{/* contexto general si aplica */}</GeneralProvider>

      <ThemeSwitcher />
      <br />
      <br />
      <br />
      <Footer />
    </Container>
  );
}

export default ReservaMaterial;
