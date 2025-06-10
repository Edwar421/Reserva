import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ComponenteReserva from "../../Components/ComponenteReserva";
import { useState } from "react";
import { useGeneral } from "../../Utils/GeneralContext";
import Contenedor from "./Contenedor";

class ContenedorReservas extends Contenedor {
  render(): JSX.Element {
    const [espacios, setEspacios] = useState<any[]>([]);
    const tipoDeCliente = localStorage.getItem("tipoDeCliente");

    useEffect(() => {
      obtenerEspacios();
    }, []);

    const obtenerEspacios = async () => {
      try {
        const response = await fetch("http://localhost:3000/espacios/consultar");
        if (!response.ok) throw new Error("Error al obtener espacios");
        const json = await response.json();
        setEspacios(json);
      } catch (error) {
        console.error("Error al obtener espacios:", error);
      }
    };

    const { handleShow, setTipoReserva } = useGeneral();

    const handleDelete = async (espacio) => {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que quieres eliminar el espacio "${espacio.nombre}"?`
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(
          `http://localhost:3000/espacios/eliminar/${espacio.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Error al eliminar el espacio");

        setEspacios(espacios.filter((e) => e.id !== espacio.id));
      } catch (error) {
        console.error("Error al eliminar el espacio:", error);
      }
    };

    const Cartas = espacios.map((data, index) => (
      <Col key={index} xs="12" sm="6" md="4" lg="3" className="text-center mt-3">
        <div onClick={() => handleShow(data)}>
          <ComponenteReserva
            nombre={data.nombre}
            tipo={data.tipo}
            capacidad={data.capacidad}
            descripcion={data.descripcion}
            cantidad={undefined}
            disponible={true}
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
          <h1 data-testid="Espacios para reservar">Tus espacios reservados:</h1>
        </div>
        <Row
          className="align-items-center"
          onClick={() => {
            setTipoReserva("espacio");
          }}
        >
          {espacios.length > 0 ? (
            Cartas
          ) : (
            <p className="h2">No hay espacios disponibles</p>
          )}
        </Row>
      </>
    );
  }
}

export default ContenedorReservas;