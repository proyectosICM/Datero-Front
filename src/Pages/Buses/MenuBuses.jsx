import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardBuses } from "./CardBuses";
import { busesEmpresaEstado } from "../../API/apiurls";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { Button } from "react-bootstrap";

export function MenuBuses() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [datos, setDatos] = useState();
  useListarElementos(`${busesEmpresaEstado}/${id}/1`, setDatos);
  return (
    <div className="container-crud">
      <div className="card-container">
      <Button className="boton-atras" onClick={() => navigation(`/`)}>
        Atras
      </Button>
        {datos && datos.map((dato) => (
          <CardBuses key={dato.id}  dato={dato}/>
        ))}
      </div>
    </div>
  );
}
