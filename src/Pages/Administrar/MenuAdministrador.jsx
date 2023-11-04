import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";
import { BsFillBusFrontFill } from "react-icons/bs";
import { BsPersonVcard } from "react-icons/bs";
import { FaMapSigns } from "react-icons/fa";
import { TbBusStop } from "react-icons/tb";
import { SiGooglemaps } from "react-icons/si";
import { AiOutlineUserSwitch } from "react-icons/ai";

export function MenuAdministrador() {
  const navigation = useNavigate();

  const tablas = ["Buses", "Trabajadores", "Rutas",  "Paraderos"];
  const iconos = [BsFillBusFrontFill, BsPersonVcard, TbBusStop, SiGooglemaps];
  const rutas = [
    `/menuEmpresas/${"busesxemp"}`,
    `/menuEmpresas/${"usuariosxemp"}`,
    `/menuEmpresas/${"rutasxemp"}`,
    `/paraderosCRUD`
  ];

  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/`)}>
        Atras
      </Button>
      {tablas.map((tabla, index) => (
        <Card className="crud-card" key={index}>
          <Card.Body>
            <div className="icon-container">{React.createElement(iconos[index], { className: "icon-class" })}</div>
            <Card.Title>{tabla}</Card.Title>
            <Card.Text>Crear, editar y eliminar {tabla}</Card.Text>
            <Link to={rutas[index]}>
              <Button variant="primary" className="btn-l">
                IR
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
