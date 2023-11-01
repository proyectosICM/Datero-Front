import React from "react";
import { Card } from "react-bootstrap";
import mapaIcono from "../../Images/mapaIcono.png";
import { useNavigate } from "react-router-dom";

export function CardBuses() {
  const navigation = useNavigate();
  return (
    <Card className="crud-card cursor-pointer" onClick={() => navigation("/panel-bus")}>
      <Card.Title>Placa: A2B-ZW3</Card.Title>
      <Card.Text>Conteo total de boletos: 856</Card.Text>
      <Card.Text>Tiempo total en ruta: 1h 32 min</Card.Text>
      <div className="contenedor-iconos">
        <img src={mapaIcono} alt="ruta-icono " className="icono-card" />
      </div>

      <Card.Text>Paradero mas reciente: Puente Santa Anita</Card.Text>
    </Card>
  );
}
