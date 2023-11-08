import React from "react";
import { Card } from "react-bootstrap";
import mapaIcono from "../../Images/mapaIcono.png";
import { useNavigate } from "react-router-dom";
import './BusesStyles.css'

export function CardBuses({ dato }) {
  const navigation = useNavigate();
  return (
    <Card className="crud-card cursor-pointer" onClick={() => navigation("/panel-bus")}>
      <div class="contenedor-card-bus" >
        <div class="first-content-bus" >
          <span style={{ fontSize: "20px" }}>Placa: {dato.placa}</span>
          <span style={{ fontSize: "20px" }}>Ruta: {dato.empresasModel.id}</span>
          <img src={mapaIcono} alt="ruta-icono " className="icono-card" />
        </div>
        <div class="second-content-bus">
        <span style={{ fontSize: "20px" }}>Placa: {dato.placa}</span>
          <span style={{ fontSize: "12px" }}>Conteo total de boletos: 856</span>
          <span style={{ fontSize: "12px" }}>Tiempo total en ruta: 1h 32 min</span>
          <span style={{ fontSize: "12px" }}>Paradero mas reciente: Puente Santa Anita</span>
          <img src={mapaIcono} alt="ruta-icono " className="icono-card" />
        </div>
      </div>
    </Card>
  );
}
