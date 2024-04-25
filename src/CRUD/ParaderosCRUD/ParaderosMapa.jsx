import React, { useRef, useCallback, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import { Text } from "ol/style";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MapaBase } from "../../Pages/Maps/MapaBase";

export function ParaderosMapa() {
  const paraderoNombre = localStorage.getItem("paraderoNombre");
  const longitud = localStorage.getItem("longitud");
  const latitud = localStorage.getItem("latitud");

  const rutas = [
    {
      paraderosModel: {
        longitud: longitud,
        latitud: latitud,
        nombre: paraderoNombre,
      },
    },
  ];

  return (
    <div className="container-registros">
      <h1>Mapa Paraderos</h1>
      <h1>{paraderoNombre}</h1>
      <Button variant="warning">
        <Link to={"/paraderosCRUD"}>Atrás</Link>
      </Button>
      <div style={{ width: "100%", height: "400px", cursor: "pointer" }}>
        <MapaBase rutas={rutas} />
      </div>
    </div>
  );
}
