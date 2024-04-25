import React, { useState } from "react";
import Swal from "sweetalert2"; 
import "../../Styles/Inicio.css";
import rutaicono from "../../Images/rutaIcono.png";
import administrarIcono from "../../Images/administrarIcono.png";
import busesIcono from "../../Images/busesIcono.png";

import { useNavigate } from "react-router-dom";

import { busesEmpresa } from "../../API/apiurls";

import { useListarElementos } from "../../Hooks/CRUDHooks";
import { MapaBase } from "../Maps/MapaBase";

export function Inicio() {
  const navigation = useNavigate();

  const [buses, setBuses] = useState();
  const idemp = 19;
  
  useListarElementos(`${busesEmpresa}/${idemp}`, setBuses);

  localStorage.setItem("empresaId", idemp);

  const mostrarAlerta = () => {
    Swal.fire({
      title: "¿Ver mapa en pantalla completa con detalles?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar alguna acción si el usuario hace clic en "Sí"
        navigation("/map-fullScreen");
      }
    });
  };

  const handleRutas = () => {
    localStorage.setItem("backURL", "/");
    navigation(`/rutas`);
  };

  return (
    <div className="container">
      <div style={{ width: "100%", height: "400px", cursor: "pointer" }} onClick={mostrarAlerta}>
        <MapaBase buses={buses} />
      </div>

      <div className="panelInferior">
        <div className="rutas" onClick={() => handleRutas()}>
          <img src={rutaicono} alt="ruta-icono " className="iconos" />
          <h1>Ver Rutas</h1>
        </div>
        <div className="buses" onClick={() => navigation(`/buses`)}>
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
