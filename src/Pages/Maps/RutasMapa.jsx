import React, { useState } from "react";
import "ol/ol.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { rpXRuta } from "../../API/apiurls";
import { MapaBuses } from "./MapaBuses";
import { MapaBase } from "./MapaBase";

export function RutasMapa({ dat }) {
  const navigation = useNavigate();
  const rutaId = localStorage.getItem("rutaId");
  const [datos, setDatos] = useState([]);

  useListarElementos(`${rpXRuta}/${rutaId}`, setDatos);

  const backURL = localStorage.getItem("backURL");

  return (
    <>
      <Button onClick={() => navigation(`${backURL}`)}>Atras</Button>
      <h1>Mapa 1 </h1>

      <div style={{ width: "100%", height: "600px", cursor: "pointer" }}>
        <MapaBase rutas={datos} />
      </div>
    </>
  );
}
