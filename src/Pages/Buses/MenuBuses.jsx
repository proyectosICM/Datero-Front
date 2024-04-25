import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardBuses } from "./CardBuses";
import { busesEmpresaEstado } from "../../API/apiurls";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { Button } from "react-bootstrap";
import "./BusesStyles.css";

export function MenuBuses() {
  const [datos, setDatos] = useState();
  const navigation = useNavigate();
  const empresaId = localStorage.getItem("empresaId");

  useListarElementos(`${busesEmpresaEstado}/${empresaId}/1`, setDatos);
  
  return (
    <div className="container-crud">
      <div className="card-container">
        <Button className="boton-atras" onClick={() => navigation(`/`)}>
          Atras
        </Button>

        {datos && datos.map((dato) => <CardBuses key={dato.id} dato={dato} />)}
      </div>
    </div>
  );
}
