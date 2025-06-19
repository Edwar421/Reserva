import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ComponenteReserva from "../../Components/ComponenteReserva";
import { useState } from "react";
import Contenedor from "./Contenedor";
import { useGeneral } from "../../Utils/GeneralContext";

class ContenedorReservasMaterial extends Contenedor {
  render(): JSX.Element {
    const [materiales, setMateriales] = useState<any[]>([]);
    const tipoDeCliente = localStorage.getItem("tipoDeCliente");
    const email = localStorage.getItem("email");
    useEffect(() => {
      obtenerMateriales();
    }, []);

    const obtenerMateriales = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservas-material?email=${email}}`);
        if (!response.ok) throw new Error("Error al obtener materiales reservados");
        const json = await response.json();
        setMateriales(json);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const { handleShow, setTipoReserva } = useGeneral();

    const handleDelete = async (material) => {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que quieres eliminar el material "${material.nombre}"?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:3000/materiales/eliminar/${material.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Error al eliminar el material");

        setMateriales(materiales.filter((m) => m.id !== material.id));
      } catch (error) {
        console.error("Error al eliminar el material:", error);
      }
    };

    const Cartas = materiales.map((data, index) => (
      <Col key={index} xs="12" sm="6" md="4" lg="3" className="text-center mt-3">
        <div onClick={() => handleShow(data)}>
          <ComponenteReserva
            nombre={data.nombre}
            tipo={undefined}
            capacidad={undefined}
            descripcion={undefined}
            cantidad={data.cantidad}
            disponible={data.cantidad > 0}
          />
        </div>
        {tipoDeCliente === "Administrador" && (
          <Button
            variant="danger"
            className="mt-2"
            onClick={() => handleDelete(data)}
          >
            Eliminar
          </Button>
        )}
      </Col>
    ));

    return (
      <>
        <div className="align-self-start ps-5 pt-5 mb-5">
          <h1 data-testid="Materiales para reservar">Tus Materiales Reservados:</h1>
        </div>
        <Row
          className="align-items-center"
          onClick={() => {
            setTipoReserva("material");
          }}
        >
          {materiales.length > 0 ? (
            Cartas
          ) : (
            <p className="h2">No hay materiales disponibles</p>
          )}
        </Row>
      </>
    );
  }
}

export default ContenedorReservasMaterial;