import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth") === "true";

  const closeSession = () => {
    localStorage.removeItem("auth");
    navigate("/Login");
  };

  return (
    <Navbar
      expand="xl"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container className="px-5">
        <Navbar.Brand as={Link} to="/">
          Mi tienda Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center w-100">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/Store">
              Store
            </Nav.Link>
            {isAuth && (
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={<span style={{ color: "white" }}>Administración</span>}
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/Users">
                    Clientes
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Admin">
                    Administración
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={closeSession}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <Nav.Link as={Link} to="/Cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Nav.Link>
          </Nav>
          <Nav>
            {!isAuth && (
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={<span style={{ color: "white" }}>Login</span>}
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/Login">
                    Inicio de sesión
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/userRegistration">
                    Regístrate
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
