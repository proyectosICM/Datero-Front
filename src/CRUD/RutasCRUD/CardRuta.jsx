import React from "react";
import { Card } from "react-bootstrap";
import configuracionIcono from "../../Images/configuracion.png";
import mapaIcono from "../../Images/mapaIcono.png";
import editarIcono from "../../Images/editarIcono.png";
import deshabilitarIcono from "../../Images/deshabilitarIcono.png";
import { useNavigate } from "react-router-dom";

export function CardRuta({dato, edit, cambiarEstado}) {
    const navigation = useNavigate();
    const handlePRueba = () => {
        alert("ds");
    }
    const idemp = 1 ;

  return (
    <Card className="crud-card" key={dato.id}>
      <Card.Body>
        <Card.Title>
          <h1>Ruta {dato.nombre}</h1>
        </Card.Title>
        <div className="contenedor-iconos">

          <img src={configuracionIcono} alt="ruta-icono " className="icono-card" onClick={() => navigation(`/paraderoxruta/${idemp}`)} />
          <img src={mapaIcono} alt="ruta-icono " className="icono-card" onClick={() => navigation(`/rutasMapa/${dato.id}`)} />
          <img src={editarIcono} alt="ruta-icono " className="icono-card" onClick={() => edit()} />
          <img src={deshabilitarIcono} alt="ruta-icono " className="icono-card" onClick={() => cambiarEstado()} />
        </div>
      </Card.Body>
    </Card>
  );
}
