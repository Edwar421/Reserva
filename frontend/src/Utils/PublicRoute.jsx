// src/Utils/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useGeneral } from "./GeneralContext";

const PublicRoute = () => {
  const { userEmail, authChecked } = useGeneral();

  if (!authChecked) return null; // Esperar a que cargue

  // Si ya está logueado, redirige al panel del usuario
  return userEmail ? <Navigate to="/pagUsuario/usuario" replace /> : <Outlet />;
};

export default PublicRoute;
