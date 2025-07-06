import { useState, useEffect } from "react";
import "../Styles/ClienteProfile.css";

// Componentes de iconos SVG simples
const UserIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className="icon-small"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Componente Button personalizado
const Button = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {children}
  </button>
);

// Componentes Card personalizados
const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

export default function UserProfile() {
  const [currentDate, setCurrentDate] = useState("");
  const email = localStorage.getItem("email");
  const [usuario, setUsuario] = useState<any>(null);
  useEffect(() => {
    if (email) {
      obtenerUsuario(email);
    } 

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("es-ES", options));
  }, []);

  const handleReservationClick = () => {
    console.log("Navegando al sistema de reservas...");
    alert("Redirigiendo al sistema de reservas...");
  };

  //Datos del usuario

  const obtenerUsuario = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3000/usuario/consultarEmail/${email}`
      );
      if (!response.ok) throw new Error("Error al obtener usuario");
      const json = await response.json();
      setUsuario(json);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Encabezado */}
        <header className="profile-header">
          <div className="profile-avatar">
            <UserIcon />
          </div>
          <h1 className="profile-title">Mi Perfil</h1>
          <div className="profile-divider"></div>
        </header>

        {/* Contenido Principal */}
        <div className="profile-content">
          {/* Tarjeta de Bienvenida */}
          <Card className="welcome-card">
            <CardHeader className="welcome-header">
              <div className="welcome-info">
                <div className="welcome-avatar">
                  <UserIcon />
                </div>
                <div className="welcome-text">
                  <h2 className="welcome-title">
                    ¡Bienvenido, {usuario ? usuario.nombre : "cargando..."}!
                  </h2>
                  <p className="welcome-subtitle">Nos alegra verte de nuevo</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="welcome-content">
              <p className="welcome-description">
                Desde aquí puedes gestionar tus reservas y acceder a todos
                nuestros servicios.
              </p>
              <Button
                onClick={handleReservationClick}
                className="reservation-btn"
              >
                <span>¿Quieres reservar?</span>
                <ArrowRightIcon />
              </Button>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          <div className="info-grid">
            {/* Fecha Actual */}
            <Card className="info-card">
              <CardContent className="info-content">
                <div className="info-item">
                  <div className="info-icon date-icon">
                    <CalendarIcon />
                  </div>
                  <div className="info-text">
                    <h3 className="info-title">Fecha Actual</h3>
                    <p className="info-value">{currentDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estado de la Cuenta */}
            <Card className="info-card">
              <CardContent className="info-content">
                <div className="info-item">
                  <div className="info-icon status-icon">
                    <div className="status-dot"></div>
                  </div>
                  <div className="info-text">
                    <h3 className="info-title">Estado</h3>
                    <p className="info-value status-active">Cuenta Activa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
