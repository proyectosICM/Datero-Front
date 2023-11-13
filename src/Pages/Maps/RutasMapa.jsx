import React, { useEffect, useRef, useCallback, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { rpXRuta } from "../../API/apiurls";
import { MapaBuses } from "./MapaBuses";

export function RutasMapa({ dat }) {
  const navigation = useNavigate();
  const idemp = 19;

  const { id } = useParams();
  const [datos, setDatos] = useState([]);

  useListarElementos(`${rpXRuta}/${id}`, setDatos);
console.log(datos)
  return (
    <>
      <Button onClick={() => navigation(`/rutasxemp/${idemp}`)}>Atras</Button>
      <h1>Mapa </h1>
      {datos && datos.length > 0 && <MapaBuses buses={datos} tipo="paradero" />}

    </>
  );
}
