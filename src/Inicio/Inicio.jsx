import React, { useState } from "react";
import "../Styles/General.css";
import "../Styles/Inicio.css";
import { TablaMonitoreo } from "../Common/TablaMonitoreo";
import { MapaMonitoreo } from "../Common/MapaMonitoreo";

export function Inicio() {
  const [mostrarMapa, setMostrarMapa] = useState(false);

  const toggleVista = () => {
    setMostrarMapa(!mostrarMapa);
  };

  const panelClass = mostrarMapa ? "panel-1 mostrar" : "panel-1";

  return (
    <div className="container">
      <div className={panelClass}>
        {mostrarMapa ? <MapaMonitoreo /> : <TablaMonitoreo />}
        <input
          type="checkbox"
          className="theme-checkbox"
          onChange={toggleVista}
          checked={mostrarMapa}
        />
      </div>
      <div className="panel-2"></div>
    </div>
  );
}
