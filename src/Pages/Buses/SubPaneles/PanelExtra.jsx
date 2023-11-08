import React from "react";
import masIcono from "../../../Images/masIcono.png";
import { useNavigate } from "react-router-dom";
export function PanelExtra() {
  const navigation = useNavigate();

  const handleHola = () => {
    alert("jpña p");
  }
  return (
    <div className="panel-extra">
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <p>Tiempo total en ruta:</p>
        <p>1h 52 min</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <p>Velocidada:</p>
        <p>32km/h</p>
      </div>

      <div style={{ width: "100%", cursor: "pointer"}} onClick={() => navigation('/historial-bus')}>
        <h5>Ver Historial</h5>
        <img src={masIcono} alt="ruta-icono " style={{ width: "3rem" }} />
      </div>
    </div>
  );
}
