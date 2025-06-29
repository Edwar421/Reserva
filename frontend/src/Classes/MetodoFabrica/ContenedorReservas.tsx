
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Contenedor from "./Contenedor";
import ComponenteReserva from "../../Components/ComponenteReserva";
import { useGeneral } from "../../Utils/GeneralContext";

class ContenedorReservas extends Contenedor {
  render(): JSX.Element {
    const [reservas, setReservas] = useState<any[]>([]);
    const { handleShow, setTipoReserva } = useGeneral();
    const tipoDeCliente = localStorage.getItem("tipoUsuario");
    const email = localStorage.getItem("email");

    useEffect(() => {
      if (email) {
        obtenerReservasPorEmail(email);
      }
    }, [email]);

    const obtenerReservasPorEmail = async (email: string) => {
      try {
        const response = await fetch(`http://localhost:3000/reservas/byEmail/${email}`);
        if (!response.ok) throw new Error("Error al obtener reservas");
        const json = await response.json();
        setReservas(json);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    const handleDelete = async (reserva) => {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que quieres eliminar la reserva del espacio "${reserva.espacio.nombre}"?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:3000/reservas/eliminar/${reserva.id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Error al eliminar la reserva");

        setReservas(reservas.filter((r) => r.id !== reserva.id));
      } catch (error) {
        console.error("Error al eliminar la reserva:", error);
      }
    };

    return (
      <>
        <div className="align-self-start ps-5 pt-5 mb-5">
          <h1 data-testid="Espacios para reservar">Tus espacios reservados:</h1>
        </div>
        <Row
          className="align-items-center"
          onClick={() => {
            setTipoReserva("espacio");
          }}
        >
          {reservas.length > 0 ? (
            reservas.map((reserva, index) => (
              <Col key={index} xs="12" sm="6" md="4" lg="3" className="text-center mt-3">
                <div onClick={() => handleShow(reserva)}>
                  <ComponenteReserva
                    nombre={reserva.espacio.nombre}
                    tipo={reserva.espacio.tipo}
                    capacidad={reserva.espacio.capacidad}
                    descripcion={reserva.espacio.descripcion}
                    cantidad={reserva.cantidad}
                    disponible={reserva.estado}
                    fecha={reserva.fecha}
                    horaInicio={reserva.horaInicio}
                    horaFin={reserva.horaFin}
                  />
                </div>
                {reserva.estado === "Pendiente" && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleDelete(reserva)}
                  >
                    Cancelar
                  </Button>
                )}
              </Col>
            ))
          ) : (
            <p className="h2">No tienes espacios reservados</p>
          )}
        </Row>
      </>
    );
  }
}

export default ContenedorReservas;
