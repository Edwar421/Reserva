import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ThemeSwitcher from "../Components/ThemeSwitcher";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { ConversionEmail } from "../Classes/Adapter/conversionEmail";
import Header from "../Classes/Header/Header";
import { FachadaDeEstados } from "../Classes/Estados/Fachada/FachadaDeEstados";

function Registro() {
  const fachada = new FachadaDeEstados();
  const emailAdapter = new ConversionEmail();
  const navigate = useNavigate();

  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(fachada.getMostrarAlerta());
  const [alertState, setAlertState] = useState(fachada.getEstadoDeAlerta());
  const [loading, setLoading] = useState(false);

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    password: "",
    tipo: "",
    cedula: "",
    codigoEstudiantil: "",
  });

  const clientChange = (e) =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const handleSelect = (e) => {
    const tipo = e.target.value;
    setCliente({ ...cliente, tipo, codigoEstudiantil: "" });
  };

  const clientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { nombre, email, password, tipo, cedula, codigoEstudiantil } = cliente;

      if (nombre.length > 45 || email.length > 45 || password.length > 45) {
        setAlertText("Los campos no deben exceder 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
        setLoading(false);
        return;
      }

      const emailLower = emailAdapter.convertirEmailAMinuscula(email);
      const payload = {
        ...cliente,
        email: emailLower,
        codigoEstudiantil: tipo === "Estudiante" ? codigoEstudiantil : null,
      };

      const res = await fetch("http://localhost:3000/usuario/crearUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        setAlertText("El usuario ya existe");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
      } else {
        setAlertText("Registro exitoso");
        setAlertState(fachada.cambioEstadoDeAlerta(0));
        setShowAlert(fachada.cambioMostrarAlerta());
        setTimeout(() => navigate("/login"), 500);
      }

      setLoading(false);
    } catch (error) {
      setAlertText("Error en el registro");
      setAlertState(fachada.cambioEstadoDeAlerta(1));
      setShowAlert(fachada.cambioMostrarAlerta());
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="text-center content">
        <ThemeSwitcher />
        <Alert
          className="mt-5"
          variant={alertState}
          show={showAlert}
          onClose={() => setShowAlert(fachada.cambioMostrarAlerta())}
          dismissible
        >
          {alertText}
        </Alert>

        <Form onSubmit={clientSubmit}>
          <Form.Group className="mb-4 mt-4" controlId="formLogo">
            <Image src="/logo.png" fluid width="25%" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTipoUsuario">
            <Form.Select onChange={handleSelect} value={cliente.tipo}>
              <option value="">Selecciona tu rol</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Profesor">Profesor</option>
              <option value="Externo">Externo</option>
              <option value="Laborista">Laborista</option>
            </Form.Select>
            <Form.Text>¿Cuál es tu rol dentro del sistema?</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={clientChange}
              value={cliente.nombre}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={clientChange}
              value={cliente.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={clientChange}
              value={cliente.password}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Control
              type="text"
              name="cedula"
              placeholder="Cédula"
              onChange={clientChange}
              value={cliente.cedula}
            />
          </Form.Group>

          {cliente.tipo === "Estudiante" && (
            <Form.Group className="mb-3" controlId="formCodigoEstudiantil">
              <Form.Control
                type="text"
                name="codigoEstudiantil"
                placeholder="Código Estudiantil"
                onChange={clientChange}
                value={cliente.codigoEstudiantil}
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={
              !cliente.nombre ||
              !cliente.email ||
              !cliente.password ||
              !cliente.tipo ||
              !cliente.cedula ||
              (cliente.tipo === "Estudiante" && !cliente.codigoEstudiantil)
            }
          >
            {loading ? "Registrando..." : "Registrarme"}
          </Button>
        </Form>

        <Form.Group>
          <hr />
          <Link to={"/"}>
            <Button variant="outline-primary">Login</Button>
          </Link>
        </Form.Group>
      </div>
    </>
  );
}

export default Registro;
