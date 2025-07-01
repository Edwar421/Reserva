import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ThemeSwitcher from "../Components/ThemeSwitcher";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Classes/Header/Header";
import "../Styles/Login.css";
import { ConversionEmail } from "../Classes/Adapter/conversionEmail";
import { FachadaDeEstados } from "../Classes/Estados/Fachada/FachadaDeEstados";

function Login() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: null,
    email: "",
    password: "",
    storedPassword: "",
    direccion_iddireccion: null,
    trial372: null,
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const emailAdapter = new ConversionEmail();
  const fachada = new FachadaDeEstados();

  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(fachada.getMostrarAlerta());
  const [alertState, setAlertState] = useState(fachada.getEstadoDeAlerta());

  const loadUsuario = async () => {
    try {
      if (cliente.email.length > 45) {
        setAlertText("El correo es mayor a 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
      } else if (cliente.password.length > 45) {
        setAlertText("La contraseña es mayor a 45 caracteres");
        setAlertState(fachada.cambioEstadoDeAlerta(1));
        setShowAlert(fachada.cambioMostrarAlerta());
      } else {
        cliente.email = emailAdapter.convertirEmailAMinuscula(cliente.email);
        const res = await fetch("http://localhost:3000/usuario/Login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cliente),
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log(data);
  
          if (data.message) {
            setAlertText(data.message);
            setAlertState(fachada.cambioEstadoDeAlerta(1));
            setShowAlert(fachada.cambioMostrarAlerta());
          } else {
            const { email, nombre, tipo } = data.user[0];
  
            setAlertText("Correo y contraseña válidos :D");
            setAlertState(fachada.cambioEstadoDeAlerta(0));
            setShowAlert(fachada.cambioMostrarAlerta());
  
            localStorage.setItem("email", email);
            localStorage.setItem("username", nombre);
            localStorage.setItem("tipoUsuario", tipo);

            console.log(tipo)

  
            // Redirigir según el tipo de usuario
            switch (tipo) {
              case "Estudiante":
                setTimeout(() => navigate("/pagUsuario"), 200);
                break;
              case "Docente":
                setTimeout(() => navigate("/pagUsuario"), 200);
                break;
              case "Externo":
                setTimeout(() => navigate("/pagUsuario"), 200);
                break;
              case "Laborista":
                setTimeout(() => navigate("/laborista"), 200);
                break;
              default:
                setAlertText("Tipo de usuario desconocido");
                setAlertState(fachada.cambioEstadoDeAlerta(1));
                setShowAlert(fachada.cambioMostrarAlerta());
            }
          }
        } else {
          setAlertText("Correo no registrado");
          setAlertState(fachada.cambioEstadoDeAlerta(1));
          setShowAlert(fachada.cambioMostrarAlerta());
        }
      }
    } catch (error) {
      console.error(error);
      setAlertText("Error de red o del servidor");
      setAlertState(fachada.cambioEstadoDeAlerta(1));
      setShowAlert(fachada.cambioMostrarAlerta());
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (cliente.email && cliente.password) {
      await loadUsuario();
    }
  };
  

  const clientChange = (e) =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  return (
    <>
      <Header />
      <Alert
        className="alert mt-5"
        variant={alertState}
        show={showAlert}
        onClose={() => setShowAlert(fachada.cambioMostrarAlerta())}
        dismissible
      >
        {alertText}
      </Alert>
      <div className="text-center content">
        <h1>Reservas UD</h1>
        <Form.Group className="mb-4 mt-4" controlId="formBasicTipo">
          <Image src="/logo.png" fluid width="22%" />
        </Form.Group>
        <Form onSubmit={handleFormSubmit} data-testid="Form">

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={clientChange}
              value={cliente.email}
              data-testid="Correo"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={clientChange}
              value={cliente.password}
              data-testid="Contraseña"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group> */}
          <Button
            variant="primary"
            type="submit"
            disabled={!cliente.email || !cliente.password}
          >
            Iniciar sesión
          </Button>
        </Form>
        <Form.Group>
          <hr />
          <Link to={"/registro"}>
            <Button
              variant="outline-primary"
              type="submit"
              data-testid="Crear cuenta"
            >
              Crear cuenta
            </Button>
          </Link>
        </Form.Group>
      </div>
      <ThemeSwitcher />
    </>
  );
}

export default Login;
