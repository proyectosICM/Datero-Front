import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { MapaBuses } from "./MapaBuses";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { busesEmpresa } from "../../API/apiurls";
import { useNavigate } from "react-router-dom";

export function MapaFullSceen() {
  const navigation = useNavigate();
  const [buses, setBuses] = useState();
  const idemp = 19;
  useListarElementos(`${busesEmpresa}/${idemp}`, setBuses);

  return (
    <div className="container-crud">
      <Button style={{ width: "100%" }} onClick={() => navigation('/')}>Atras</Button>
      <h1>Mapa de buses</h1>
      <MapaBuses buses={buses} tipo="bus" />
      <div className="card-container">
        <Card className="crud-card">
          <span style={{ fontSize: "20px" }}>Ruta ABC </span>
          <span style={{ fontSize: "20px" }}>Ver paraderos</span>
        </Card>

        <Card className="crud-card">
          <span style={{ fontSize: "20px" }}>Ruta ABC </span>
          <span style={{ fontSize: "20px" }}>Ver paraderos</span>
        </Card>

        <Card className="crud-card">
          <span style={{ fontSize: "20px" }}>Ruta ABC </span>
          <span style={{ fontSize: "20px" }}>Ver paraderos</span>
        </Card>

        <Card className="crud-card">
          <span style={{ fontSize: "20px" }}>Ruta ABC </span>
          <span style={{ fontSize: "20px" }}>Ver paraderos</span>
        </Card>

        <Card className="crud-card">
          <span style={{ fontSize: "20px" }}>Ruta ABC </span>
          <span style={{ fontSize: "20px" }}>Ver paraderos</span>
        </Card>
      </div>
    </div>
  );
}
