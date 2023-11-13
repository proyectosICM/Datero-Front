import React from "react";
import { Card } from "react-bootstrap";
import configuracionIcono from "../../Images/configuracion.png";
import mapaIcono from "../../Images/mapaIcono.png";
import editarIcono from "../../Images/editarIcono.png";
import deshabilitarIcono from "../../Images/deshabilitarIcono.png";
import { useNavigate } from "react-router-dom";
import "../../Styles/animaciones.css";

export function CardRuta({ dato, edit, cambiarEstado }) {
  const navigation = useNavigate();
  const idemp = 1;
 
  return (
    <Card className="crud-card" key={dato.id}>
      <Card.Body>
        <Card.Title>
          <h1>Ruta {dato.nombre}</h1>
        </Card.Title>
        <div className="contenedor-iconos">
          <div class="contenedor-card">
            <div class="first-content">
              <img src={configuracionIcono} alt="ruta-icono " className="icono-card" onClick={() => navigation(`/paraderoxruta/${dato.id}`)} />
            </div>
            <div class="second-content">
              <span style={{fontSize:'12px'}} onClick={() => navigation(`/paraderoxruta/${dato.id}`)}>Cambie/edite los paraderos de la ruta</span>
            </div>
          </div>

          <div class="contenedor-card">
            <div class="first-content">
              <img src={mapaIcono} alt="ruta-icono " className="icono-card" onClick={() => navigation(`/rutasMapa/${dato.id}`)} />
            </div>
            <div class="second-content">
              <span style={{fontSize:'12px'}}  onClick={() => navigation(`/rutasMapa/${dato.id}`)} >Vea la ruta reflejada en un mapa</span>
            </div>
          </div>

          <div class="contenedor-card" onClick={() => edit()}>
            <div class="first-content">
              <img src={editarIcono} alt="ruta-icono " className="icono-card" />
            </div>
            <div class="second-content">
              <span style={{fontSize:'12px'}}>Edite el nombre de la ruta</span>
            </div>
          </div>

          <div class="contenedor-card" onClick={() => cambiarEstado()}>
            <div class="first-content">
            <img src={deshabilitarIcono} alt="ruta-icono " className="icono-card"  />
            </div>
            <div class="second-content"  >
              <span style={{fontSize:'12px'}}>Deshabilite la ruta</span>
            </div>
          </div>

        </div>
      </Card.Body>
    </Card>
  );
}
