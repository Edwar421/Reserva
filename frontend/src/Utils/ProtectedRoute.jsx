// src/Utils/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useGeneral } from "./GeneralContext";

const ProtectedRoute = () => {
  const { userEmail, authChecked  } = useGeneral();
  if (!authChecked) return null;

  return userEmail ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
