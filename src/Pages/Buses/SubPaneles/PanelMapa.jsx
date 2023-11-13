import React, { useState } from "react";
import { MapaDePrueba } from "../../../Common/MapaDePrueba";
import { MapaBusxRuta } from "../../Maps/MapaBusxRuta";
import { busesURL, rpXRuta } from "../../../API/apiurls";
import { useListarElementos } from "../../../Hooks/CRUDHooks";

export function PanelMapa({ idbus, idruta }) {
  const [bus, setBus] = useState();
  const [ruta, setRuta] = useState();

  useListarElementos(`${busesURL}/${idbus}`, setBus);
  useListarElementos(`${rpXRuta}/${idruta}`, setRuta);



  return (
    <div className="panel-mapa">
      {/* <MapaDePrueba /> */}
      <MapaBusxRuta bus={bus} ruta={ruta} />
    </div>
  );
}
