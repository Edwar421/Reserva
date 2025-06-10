import React from "react";
import { Col, Card, Badge } from "react-bootstrap";
import { Builder } from "./Builder";
import Carta from "./Carta";

export class BuilderConcreto extends Builder {
  constructor() {
    super();
  }

  construirParte(propiedades: {
    nombre: string;
    tipo?: string;
    capacidad?: number;
    descripcion?: string;
    cantidad?: number;
    disponible?: boolean;
  }): void {
    this.carta.setPropiedades(propiedades);
  }

  crearCarta() {
    this.createText();
    this.createBody();
    this.createCard();
    this.createCol();
  }

  createText(): JSX.Element {
    const { nombre, tipo, capacidad, descripcion, cantidad, disponible } =
      this.carta.getPropiedades();
    
    const cardText = (
      <Card.Text>
        <strong>{nombre}</strong>
        <br />
        {tipo && (
          <>
            <Badge bg="info" className="me-2">
              {tipo}
            </Badge>
            <br />
          </>
        )}
        {capacidad && (
          <>
            <small>Capacidad: {capacidad} personas</small>
            <br />
          </>
        )}
        {cantidad !== undefined && (
          <>
            <small>Cantidad disponible: {cantidad}</small>
            <br />
          </>
        )}
        {descripcion && <small className="text-muted">{descripcion}</small>}
        <br />
        <Badge bg={disponible ? "success" : "danger"}>
          {disponible ? "Disponible" : "No disponible"}
        </Badge>
      </Card.Text>
    );
    this.carta.setCardText(cardText);
    return cardText;
  }

  createBody(): JSX.Element {
    const textElement = this.carta.getCardText();
    const cardBody = <Card.Body>{textElement}</Card.Body>;
    this.carta.setCardBody(cardBody);
    return cardBody;
  }

  createCard(): JSX.Element {
    const bodyElement = this.carta.getCardBody();
    const { disponible } = this.carta.getPropiedades();
    
    const createCard = (
      <Card className={`custom-card ${!disponible ? 'opacity-75' : ''}`}>
        <Card.Header className="text-center">
          <i className="fas fa-calendar-alt fa-2x text-primary"></i>
        </Card.Header>
        {bodyElement}
      </Card>
    );
    this.carta.setCreateCard(createCard);
    return createCard;
  }

  createCol(): JSX.Element {
    const cardElement = this.carta.getCreateCard();
    const createCol = (
      <Col className="text-center centered">
        {cardElement}
      </Col>
    );
    this.carta.setCreateCol(createCol);
    return createCol;
  }

  getResultado(): Carta {
    return this.getCarta();
  }
}