import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PanelBoletos } from "./SubPaneles/PanelBoletos";
import { PanelExtra } from "./SubPaneles/PanelExtra";
import { PanelRegistros } from "./SubPaneles/PanelRegistros";

export function PanelBus() {
  const navigation = useNavigate();
  const id = 19;
  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/buses/${id}`)}>
        Atras
      </Button>
      <div className="panel-mapa">
        <h1>Panel mapa</h1>
      </div>

      <PanelBoletos />

      <PanelRegistros />
      <PanelExtra />
    </div>
  );
}
