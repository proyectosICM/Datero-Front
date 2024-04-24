import React, { useEffect, useRef, useCallback, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { generarEstiloMarcador, marcadorItem } from "./MarcadoresLayer";

const position = [-76.95769789314294, -12.036776926858456];
const yo = [-76.95769789314294, -12.036776926858456];

export function MapaBuses() {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);

  const createMap = useCallback(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
            attributions: "© Google Maps 2",
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(position),
        zoom: 15,
      }),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    initialMap.addLayer(markerLayer);

    const markerFeature1 = new Feature({
      geometry: new Point(fromLonLat(yo)),
    });
    markerLayer.getSource().addFeature(markerFeature1);

    markerFeature1.setStyle(generarEstiloMarcador);

    setMap(initialMap);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showMap) {
      createMap();
    }
  }, [showMap, createMap]);

  useEffect(() => {
    if (showMap && map) {
      const markerSource = map.getLayers().item(1).getSource(); // Obtener la fuente de marcadores
      const markerFeatures = markerSource.getFeatures(); // Obtener todas las características de los marcadores

      // Calcular la posición media de los marcadores
      const center = markerFeatures.reduce(
        (acc, feature) => {
          const geometry = feature.getGeometry();
          const coordinates = geometry.getCoordinates();
          const lonLat = toLonLat(coordinates);
          acc[0] += lonLat[0];
          acc[1] += lonLat[1];
          return acc;
        },
        [0, 0]
      );
      center[0] /= markerFeatures.length;
      center[1] /= markerFeatures.length;

      // Establecer la vista del mapa para que esté centrada en la posición media de los marcadores
      map.getView().setCenter(fromLonLat(center));

      // Ajustar el zoom para mostrar todos los marcadores
      map.getView().fit(markerSource.getExtent(), { padding: [150, 100, 100, 50] });
    }
  }, [showMap, map]);

  return <>{showMap && <div ref={mapRef} className="mapa" />}</>;
}
