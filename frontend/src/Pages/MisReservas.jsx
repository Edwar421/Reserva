import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { GeneralProvider } from "../Utils/GeneralContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import ContenedorCartas from "../Components/ContenedorCartas";
import "../Styles/Catalogo.css";

function MisReservas() {
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
                <h1>Tus reservas</h1>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <GeneralProvider>
          <ContenedorCartas tipo="espacios" />
          <ContenedorCartas tipo="materiales" />
        </GeneralProvider>
      
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

export default MisReservas;