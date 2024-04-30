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

  const handleBack = () => {
    const backURL = localStorage.getItem("backURL");
    navigation(backURL);
    localStorage.getItem("backURL");
    if (backURL == "/ruta") {
      localStorage.setItem("backURL", "/");
    } else if (backURL == "/paraderos-de-ruta") {
      localStorage.setItem("backURL", "/ruta");
    }
  };
 
  return (
    <>
      <Button style={{ width: "95%", marginTop: "2%"}} onClick={() => handleBack()}>Atras</Button>
      <div style={{ width: "100%", height: "600px", cursor: "pointer" }}>
        <MapaBase rutas={datos} />
      </div>
    </>
  );
}
