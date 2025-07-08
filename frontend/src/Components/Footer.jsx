import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../Styles/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <div className="">

        <Container
          fluid
          className="border-toper align-items-center  bg-body-tertiary  py-2 "
          data-testid="Footer"
        >
          <Row>
            <Col xs lg={4}>
              <Image className="logoFooter" src="/logo.png" fluid width="22%" />
            </Col>
            <Col className="text-center">
              <a href="https://www.instagram.com/udistrital_oficial/" className="btn">
                Nosotros
              </a>
            </Col>
            <Col className="text-center">
              <a href="https://www.facebook.com/UniversidadDistrital" className="btn">
                Contactanos
              </a>
            </Col>
            <Col className="text-center">
              <a href="https://x.com/udistrital" className="btn">
                Siguenos
              </a>
            </Col>
            <Col xs lg={4}></Col>
          </Row>

          <Row>
            <Col xs lg={4}></Col>
            <Col className="text-center">
              <a href="https://www.instagram.com/udistrital_oficial/" className="btn">
                <FontAwesomeIcon size="2x" icon={faInstagram} />
              </a>
            </Col>
            <Col className="text-center">
              <a href="https://www.facebook.com/UniversidadDistrital" className="btn">
                <FontAwesomeIcon size="2x" icon={faFacebook} />
              </a>
            </Col>
            <Col className="text-center">
              <a href="https://x.com/udistrital" className="btn">
                <FontAwesomeIcon size="2x" icon={faTwitter} />
              </a>
            </Col>
            <Col xs lg={4}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
