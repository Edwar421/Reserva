import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* Componentes personalizados */
// { GeneralProvider } from "../Utils/generalContext";
//import { SpecificProvider } from "../Utils/SpecificContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ThemeSwitcher from "../Components/ThemeSwitcher";
import ContenedorCartas from "../Components/ContenedorCartas";
import FiltroReservas from "../Components/FiltroReservas";
import CalendarioDisponibilidad from "../Components/CalendarioDisponibilidad";
import { Outlet } from "react-router-dom";
/* Estilos */
import "../Styles/Catalogo.css";

function PagLaborista() {
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);

  return (
    <>
      <Container fluid className="align-items-center m-0 p-0">
        <Row className="width-100vw">
          <Header />
        </Row>

        <Row className="width-100vw">
          <Outlet />
        </Row>
        
        <Footer />
      </Container>
    </>
  );
}

export default PagLaborista;
