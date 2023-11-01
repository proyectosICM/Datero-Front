import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../Images/logo_icm.png";

export function NavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="navbar-container">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">
           Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="text-white" /> {/* Agregar la clase 'text-white' al ícono */}
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="#action1" className="text-white">
              Home
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-success">Cerrar Sesion</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
