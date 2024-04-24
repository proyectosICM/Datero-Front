import { Feature, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { useCallback, useEffect, useState } from "react";
import Map from "ol/Map";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
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
  // const setMap = useState(null)[1];
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

export const addMarker = (map, position) => {
  const marker = new Feature({
    geometry: new Point(fromLonLat(position)),
  });

  map.addLayer(
    new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
      style: new Style({
        image: new Icon({
          src: require("../../Images/busesIcono.png"),
          anchor: [0.5, 1],
          scale: 0.09,
        }),
      }),
    })
  );
};


