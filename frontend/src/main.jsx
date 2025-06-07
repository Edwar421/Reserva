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
import Reserva from "./Pages/Reserva.tsx"
import ReservaMaterial from "./Pages/ReservaMaterial.jsx";
import MisReservas from "./Pages/MisReservas.jsx";
import Laborista from "./Pages/Laborista.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/reserva" element={<Reserva />}/>
      <Route path="/reservaMaterial" element={<ReservaMaterial />}/>
      <Route path="/misReservas" element={<MisReservas />}/>
      <Route path="/laborista" element={<Laborista />}/>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
