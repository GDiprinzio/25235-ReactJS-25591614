import { Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center">
      <Container>
        <Nav className="justify-content-center ">
          <Nav.Item className="d-flex gap-3">
            <Nav.Link href="#Facebook" className="text-white" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </Nav.Link>
            <Nav.Link href="#Instagram" className="text-white" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </Nav.Link>
            <Nav.Link href="#WhatsApp" className="text-white" target="_blank">
              <FontAwesomeIcon icon={faWhatsapp} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
          Gabriel Di Prinzio
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
