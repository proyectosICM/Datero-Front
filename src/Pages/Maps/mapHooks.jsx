import { Feature, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { useCallback, useEffect, useState } from "react";
import Map from "ol/Map";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Icon, Style, Text  } from "ol/style";
export const useShowMapAfterDelay = (delay) => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showMap;
};
 
export const useCreateMap = (mapRef, position, setMap) => {
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

    setMap(initialMap);
  }, [mapRef, position, setMap]);

  return createMap;
};

export const addMarker = (map, position, image, title) => {
  const marker = new Feature({
    geometry: new Point(fromLonLat(position)),
  });

  let markerImageSrc;
  if (image === 'busesIcono') {
    markerImageSrc = require("../../Images/busesIcono.png");
  } else if (image === 'paradero') {
    markerImageSrc = require("../../Images/paradero.png");
  } else {
    markerImageSrc = require("../../Images/masIcono.png");
  }

  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
      style: new Style({
        image: new Icon({
          src: markerImageSrc,
          anchor: [0.5, 1],
          scale: 0.09,
        }),
        text: new Text({
          text: title, // Título del marcador
          offsetY: -80, // Desplazamiento vertical del texto para que aparezca sobre el marcador
          textAlign: "center", // Alineación del texto
          fill: new Fill({ color: '#000' }), // Color del texto
          font: '15px Arial, sans-serif', // Fuente y tamaño del texto
          backgroundFill: new Fill({ color: 'rgba(255,255,255,0.5)' })
        }),
      }),
    })
  );
};
