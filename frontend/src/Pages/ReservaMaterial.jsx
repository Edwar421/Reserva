import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* Componentes personalizados */
import { GeneralProvider } from "../Utils/generalContext";
//import { SpecificProvider } from "../Utils/SpecificContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ThemeSwitcher from "../Components/ThemeSwitcher";
//import ContenedorCartas from "../Components/ContenedorCartas";
import FiltroReservas from "../Components/FiltroReservas";
import CalendarioDisponibilidad from "../Components/CalendarioDisponibilidad";

/* Estilos */
import "../Styles/Catalogo.css";

function ReservaMaterial() {
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);

  return (
    <>
      <Container fluid className="align-items-center m-0 p-0">
        <Row className="width-100vw">
          <Header />
        </Row>

        <Row className="width-100vw">
          <Col xs={{ span: 8, offset: 2 }}>
            <Row className="p-5">
              <Col className="centered" data-testid="camisas">
                <img src="/logo.png" alt="Logo" fluid width="22%" />
              </Col>
              <Col>
                <br />
                <h1>Reserva</h1>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="px-5">
          <Col md={{ span: 6, offset: 3 }}>
            <h3 className="text-center mb-4">Reservar Aula</h3>
            <FiltroReservas onSelectEspacio={setEspacioSeleccionado} />
            {espacioSeleccionado && (
              <CalendarioDisponibilidad idEspacio={parseInt(espacioSeleccionado)} />
            )}
          </Col>
        </Row>

        <GeneralProvider>
        
        </GeneralProvider>

        <ThemeSwitcher />

        <br />
        <br />
        <br />
        <Footer />
      </Container>
    </>
  );
}

export default ReservaMaterial;
