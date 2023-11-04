import React, { useState } from "react";
// import "../Styles/General.css";
import "../../Styles/Inicio.css";
import { TablaMonitoreo } from "../../Common/TablaMonitoreo";
import { MapaMonitoreo } from "../../Common/MapaMonitoreo";
import rutaicono from "../../Images/rutaIcono.png";
import administrarIcono from "../../Images/administrarIcono.png"
import busesIcono from "../../Images/busesIcono.png"
import { MapaDePrueba } from "../../Common/MapaDePrueba";
import { useNavigate } from "react-router-dom";

export function Inicio() {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const navigation = useNavigate();

 const id = 19
  const handleHola = (texto) => {
    alert("Hola p " + texto);
  }
  return (
    <div className="container">
      <div className="mapa"><MapaDePrueba /></div>
      <div className="panelInferior">
        <div className="rutas" onClick={() =>  navigation(`/rutasxemp/${id}`)}>
          <img src={rutaicono} alt="ruta-icono " className="iconos" />
          <h1>Ver Rutas</h1>
        </div>
        <div className="buses" onClick={() => navigation(`/buses/${id}`)}>
          <img src={busesIcono} alt="ruta-icono " className="iconos" />
          <h1>Ver registros de buses</h1>
        </div>
        <div className="administrar" onClick={() => navigation("/menu-administrador")}>
          <img src={administrarIcono} alt="ruta-icono " className="iconos" />
          <h1>Administrar</h1>
        </div>
      </div>
    </div>
  );
}
