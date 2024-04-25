import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useListarElementos } from "../../../Hooks/CRUDHooks";
import ExcelJS from "exceljs";
import historialIcono from "../../../Images/historialIcono.png";
import semanaIcono from "../../../Images/7dias.png";
import mesIcono from "../../../Images/31dias.png";
import { busesURL } from "../../../API/apiurls";
export function PanelHistorialBus() {
  const navigation = useNavigate();

  // const [datos, setDatos] = useState([]);

  // useListarElementos("http://localhost:8080/api/conteoB/last-7-days-ordered/1", setDatos);

  //const [bus, setBus] = useState();
  //useListarElementos(`${busesURL}/${busId}`, setBus);

  const handleHistorialDetalle = (dias) => {
    localStorage.setItem("diasHistorial", dias);
    navigation(`/historial-detalle`)
  }

  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/panel-bus`)}>
        Atras
      </Button>

      <Card style={{ margin: "2%", width: "100%" }}>
        <h1>Placa: ABC-123</h1>
      </Card>

      <Card className="crud-card cursor-pointer" onClick={() => handleHistorialDetalle(7)}>
        <div class="contenedor-card-bus">
          <div class="first-content-bus">
            <span style={{ fontSize: "20px" }}>Historial de los ultimos 7 dias </span>
            <img src={historialIcono} alt="ruta-icono " className="icono-card" />
          </div>
          <div class="second-content-bus">
            <img src={semanaIcono} alt="ruta-icono " className="icono-card" />
            <span style={{ fontSize: "20px" }}>Historial de los ultimos 7 dias </span>
          </div>
        </div>
      </Card>

      <Card className="crud-card cursor-pointer" onClick={() => handleHistorialDetalle(31)}>
        <div class="contenedor-card-bus">
          <div class="first-content-bus">
            <span style={{ fontSize: "20px" }}>Historial de los ultimos 31 dias </span>
            <img src={historialIcono} alt="ruta-icono " className="icono-card" />
          </div>
          <div class="second-content-bus">
            <img src={mesIcono} alt="ruta-icono " className="icono-card" />
            <span style={{ fontSize: "20px" }}>Historial de los ultimos 31 dias </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
