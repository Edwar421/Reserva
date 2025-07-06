import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { GeneralProvider } from "../Utils/GeneralContext";
import Footer from "../Components/Footer";
import Header from "../Classes/Header/Header";
import { Outlet } from "react-router-dom";

function PagUsuario() {

  return (
    <GeneralProvider>
      <Container fluid className="align-items-center m-0 p-0">
        <Row className="width-100vw">
          <Header />
        </Row>

        <Row className="width-100vw">
          <Outlet />
        </Row>

        <Footer />
      </Container>
    </GeneralProvider>
  );
}

export default PagUsuario;
