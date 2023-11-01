import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CardBuses } from "./CardBuses";
import { busesEmpresaEstado } from "../../API/apiurls";
import { useListarElementos } from "../../Hooks/CRUDHooks";

export function MenuBuses() {
  const { id } = useParams();
  const [datos, setDatos] = useState();
  useListarElementos(`${busesEmpresaEstado}/${id}/1`, setDatos);
  return (
    <div className="container-crud">
      <div className="card-container">
        {datos && datos.map((dato) => (
          <CardBuses key={dato.id} />
        ))}
      </div>
    </div>
  );
}
