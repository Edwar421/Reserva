import Container from "react-bootstrap/Container";
import HeaderContext from "./Strategy/HeaderContext";
import { useState, useEffect } from "react";

// Cabecera
const Header = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [contexto, setContexto] = useState(new HeaderContext());

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsUserAuthenticated(username !== null);
  }, []);

  // Escucha manual de cambios en el localStorage (opcional, en caso de que la sesión se modifique desde otra pestaña)
  useEffect(() => {
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      setIsUserAuthenticated(username !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Container fluid className="mx-0 px-0">
      {contexto.renderNavbar(isUserAuthenticated)}
    </Container>
  );
};

export default Header;
