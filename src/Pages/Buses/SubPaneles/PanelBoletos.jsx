import React, { useState } from "react";
import { useListarElementos } from "../../../Hooks/CRUDHooks";
import { conteobxbus } from "../../../API/apiurls";
 
export function PanelBoletos({idbus}) {
  const [datos, setDatos] = useState();

  useListarElementos(`${conteobxbus}${idbus}`, setDatos);

  return (
    <div className="panel-boletos" >
      <p className="texto-titulo">Conteo de Boletos</p>
      <p className="texto-titulo">Ruta {dat}</p>
      <p className="texto-titulo">22/10/2023</p>
      {datos &&
        datos.map((dato) => (
          <div key={dato.id} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <h5>{dato.boletosModel.nombre}</h5>
            <h5>{dato.conteo}</h5>
          </div>
        ))}
    </div>
  );
}
