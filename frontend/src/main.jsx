import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//import ProtectedRoutes from "./Utils/ProtectedRoutes.jsx";
import Login from "./Pages/Login.jsx";
import Registro from "./Pages/Registro.jsx";
import Reserva from "./Pages/Reserva.tsx";
import ReservaMaterial from "./Pages/ReservaMaterial.jsx";
import MisReservas from "./Pages/MisReservas.jsx";
import Laborista from "./Pages/PagLaborista.jsx";
import GestionMateriales from "./Pages/GestionMateriales.jsx";
import PagUsuario from "./Pages/PagUsuario.jsx";
import Usuario from "./Pages/Usuario.jsx";
import GestionReserva from "./Pages/GestionReservas.jsx";
import { GeneralProvider } from "./Utils/GeneralContext";
import ProtectedRoute from "./Utils/ProtectedRoute";
import PublicRoute from "./Utils/PublicRoute";
import Cliente from "./Components/ClienteProfile.tsx"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/laborista" element={<Laborista />} >
          <Route path="" element={<Cliente />} />
          <Route path="usuario" element={<Cliente />} />
          <Route path="gestionMateriales" element={<GestionMateriales />} />
          <Route path="gestionReservas" element={<GestionReserva />} />
        </Route>
        <Route path="/pagUsuario" element={<PagUsuario />}>
          <Route path="" element={<Cliente />} />
          <Route path="usuario" element={<Cliente />} />
          <Route path="reserva" element={<Reserva />} />
          <Route path="reservaMaterial" element={<ReservaMaterial />} />
          <Route path="misReservas" element={<MisReservas />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GeneralProvider>
    <RouterProvider router={router} />
  </GeneralProvider>
);
