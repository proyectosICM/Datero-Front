import React, { useEffect, useRef, useCallback, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useListarElementos } from '../../Hooks/CRUDHooks';
import { rpXRuta } from '../../API/apiurls';

export function RutasMapa({ dat }) {
  const { id} = useParams();

  const [datos, setDatos] = useState([]);
  useListarElementos(`${rpXRuta}/${id}`, setDatos);
  console.log(`${rpXRuta}/${id}`)
  const position = [-76.9730944, -12.0582007];
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    setDatos(dat);
  }, [dat]);

  const createMap = useCallback(() => {
    if (!map) {
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
              attributions: '© Google Maps',
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

      datos.forEach((dato) => {
        const { longitud, latitud } = dato.paraderosModel;
        const punteroStyle = new Style({
          image: new CircleStyle({
            radius: 5,
            fill: null,
          }),
        });

        const vecinoStyle = new Style({
          image: new Icon({
            src: require('../../Images/paradero.png'),
            anchor: [0.5, 1],
            scale: 0.09,
          }),
        });

        const feature = new Feature({
          geometry: new Point(fromLonLat([longitud, latitud])),
        });

        feature.setStyle(vecinoStyle);
        markerLayer.getSource().addFeature(feature);
      });

      setMap(initialMap);
    }
  }, [datos, map, position]);

  const handleButtonClick = () => {
    createMap();
  };

  return (
    <>
      <h1>Mapa </h1>
      <Button onClick={handleButtonClick}>Mostrar Mapa</Button>
      <div ref={mapRef} className="mapa" />
    </>
  );
}
