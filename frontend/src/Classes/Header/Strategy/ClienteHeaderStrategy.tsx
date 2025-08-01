import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../../Styles/ClienteHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faUser,
  faCartShopping,
  faSignOut,
  faStar,
  faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import HeaderStrategy from "./HeaderStrategy";

// Estrategia para cliente autenticado
class ClienteHeaderStrategy implements HeaderStrategy {
  // Atributos de la clase
  private navigate = useNavigate();

  // Metodo para cerrar sesion
  public reset = (): void => {
    localStorage.clear();
    this.navigate("/");
    window.location.reload();
  };

  // Metodo que retorna la barra de navegacion del cliente
  public renderNavbar(): JSX.Element {
    return (
      <>
        <Navbar
          data-testid="Header"
          sticky="top"
          key="md"
          expand="md"
          className="bg-body-tertiary mb-5 border-bottomer ps-5"
        >
          <Navbar.Brand href="/pagUsuario">
            Reservas UD
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav
                variant="pills"
                className="justify-content-end flex-grow-1 pe-3"
              >


                <Nav.Item className="item">
                  <Nav.Link as={Link} to="/pagUsuario/usuario" active={location.pathname === "/"}>
                    <FontAwesomeIcon icon={faUser} /> {localStorage.username}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="item">
                  <Nav.Link as={Link} to="/pagUsuario/reserva" active={location.pathname === "/"}>
                    <FontAwesomeIcon icon={faShop} /> Reservar Espacio
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="item">
                  <Nav.Link
                    as={Link}
                    to="/pagUsuario/reservaMaterial"
                    active={location.pathname === "/"}
                  >
                    <FontAwesomeIcon icon={faStar} /> Reservar Material
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="item">
                  <Nav.Link
                    as={Link}
                    to="/pagUsuario/externo"
                    active={location.pathname === "/"}
                  >
                    <FontAwesomeIcon icon={faArrowPointer} /> Recursos externos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="item">
                  <Nav.Link
                    as={Link}
                    to="/pagUsuario/misReservas"
                    active={location.pathname === "/"}
                  >
                    <FontAwesomeIcon icon={faCartShopping} /> Mis Reservas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => this.reset()}>
                  <Nav.Link
                    as={Link}
                    to="/"
                    active={location.pathname === "/" }
                    >
                      <FontAwesomeIcon icon={faSignOut} /> Cerrar sesión
                  </Nav.Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar >
      </>
    );
  }
}

export default ClienteHeaderStrategy;
