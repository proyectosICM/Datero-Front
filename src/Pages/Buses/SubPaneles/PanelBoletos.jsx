import React, { useState } from "react";
import { useListarElementos } from "../../../Hooks/CRUDHooks";
import { busesURL, conteobxbus } from "../../../API/apiurls";
 
export function PanelBoletos({idbus}) {
  const [datos, setDatos] = useState();
  const [bus, setBus] = useState();
  useListarElementos(`${conteobxbus}${idbus}`, setDatos);
  useListarElementos(`${busesURL}/${idbus}`, setBus);

  return (
    <div className="panel-boletos" >
      <p className="texto-titulo">Conteo de Boletos</p>
      <p className="texto-titulo" style={{width: "100%"}}>Ruta {bus && bus.rutasModel.nombre}</p>
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
