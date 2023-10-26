import React from "react";
import { Button } from "react-bootstrap";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";

export function BotonesDeGestion({ ide, estado, dato, edit, cambiarEstado }) {
  return (
    <>
      <Button variant="success" className="gestion" onClick={() => edit(dato)}>
        <GrEdit /> Editar
      </Button>
      <Button
        variant={dato[estado] ? "warning" : "primary"}
        className="gestion"
        onClick={() => {
          cambiarEstado(dato[ide]);
        }}
      >
        {dato[estado] ? <BsXCircleFill /> : <BsFillCheckCircleFill />}
        {dato[estado] ? " Deshabilitar" : " Habilitar"}
      </Button>
    </>
  );
}
