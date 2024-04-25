import React, { useState } from "react";
import { MapaDePrueba } from "../../../Common/MapaDePrueba";
import { MapaBusxRuta } from "../../Maps/Mapa1BusxRuta";
import { busesURL, rpXRuta } from "../../../API/apiurls";
import { useListarElementos } from "../../../Hooks/CRUDHooks";
import { MapaBuses } from "../../Maps/MapaBuses";
import { MapaBase } from "../../Maps/MapaBase";

export function PanelMapa({ idbus, idruta }) {
  const [bus, setBus] = useState();
  const [ruta, setRuta] = useState();

  useListarElementos(`${busesURL}/${idbus}`, setBus);
  useListarElementos(`${rpXRuta}/${idruta}`, setRuta);

  //console.log(bus)
  return (
    <div className="panel-mapa">
      <div style={{ width: "100%", height: "350px", cursor: "pointer" }}>
        <MapaBase buses={bus} rutas={ruta} />
      </div>
    </div>
  );
}
