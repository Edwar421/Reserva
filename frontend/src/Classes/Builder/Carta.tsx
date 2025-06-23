import React from "react";

class Carta {
  private nombre: string;
  private tipo?: string;
  private capacidad?: number;
  private descripcion?: string;
  private cantidad?: number;
  private disponible?: boolean;
  private fecha?: string;
  private horaInicio?: string;
  private horaFin?: string;
  private cardBody: JSX.Element;
  private cardText: JSX.Element;
  private createCard: JSX.Element;
  private createCol: JSX.Element;

  constructor() {
    this.nombre = "";
    this.tipo = undefined;
    this.capacidad = undefined;
    this.descripcion = undefined;
    this.cantidad = undefined;
    this.disponible = undefined;
    this.fecha = undefined;
    this.horaInicio = undefined;
    this.horaFin = undefined;
    this.cardBody = <></>;
    this.cardText = <></>;
    this.createCard = <></>;
    this.createCol = <></>;
  }

  setPropiedades({
    nombre,
    tipo,
    capacidad,
    descripcion,
    cantidad,
    disponible,
    fecha,
    horaInicio,
    horaFin,
  }: {
    nombre: string;
    tipo?: string;
    capacidad?: number;
    descripcion?: string;
    cantidad?: number;
    disponible?: boolean;
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
  }) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.capacidad = capacidad;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.disponible = disponible;
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
  }

  getPropiedades() {
    return {
      nombre: this.nombre,
      tipo: this.tipo,
      capacidad: this.capacidad,
      descripcion: this.descripcion,
      cantidad: this.cantidad,
      disponible: this.disponible,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
    };
  }

  // Getters
  getCardBody(): JSX.Element {
    return this.cardBody;
  }

  getCardText(): JSX.Element {
    return this.cardText;
  }

  getCreateCard(): JSX.Element {
    return this.createCard;
  }

  getCreateCol(): JSX.Element {
    return this.createCol;
  }

  // Setters
  setCardBody(cardBody: JSX.Element) {
    this.cardBody = cardBody;
  }

  setCardText(cardText: JSX.Element) {
    this.cardText = cardText;
  }

  setCreateCard(createCard: JSX.Element) {
    this.createCard = createCard;
  }

  setCreateCol(createCol: JSX.Element) {
    this.createCol = createCol;
  }
}

export default Carta;