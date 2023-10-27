import React, { useRef, useCallback, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import { Text } from 'ol/style';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function ParaderosMapa() {
  const { nombre, longitud, latitud } = useParams();

  const mapRef = useRef(null);
  const map = useRef(null);

  const position = [longitud, latitud];
  const paraderoCor = [longitud, latitud];

  const createMap = useCallback(() => {
    if (map.current) return; // Evitamos la recreación del mapa

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

    const paraderoStyle = new Style({
      image: new Icon({
        src: require('../../Images/paradero.png'),
        anchor: [0.5, 1],
        scale: 0.1,
        text: new Text({
          text: 'Título del marcador',
          offsetY: 0, // Ajusta la posición vertical del texto
          textAlign: 'center',
          fill: new Fill({ color: '#000000' }),
        }),
      }),
    });

    const vecinoFeature = new Feature({
      geometry: new Point(fromLonLat(paraderoCor)),
    });

    vecinoFeature.setStyle(paraderoStyle);
    markerLayer.getSource().addFeature(vecinoFeature);

    map.current = initialMap;
  }, [position]);

  useEffect(() => {
    createMap(); // Llamar a createMap una vez
  }, []);

  return (
    <div className="container-registros">
      <h1>Mapa Paraderos</h1>
      <h1>{nombre}</h1>
      <Button variant="warning">
        <Link to={'/paraderosCRUD'}>Atrás</Link>
      </Button>
      <div ref={mapRef} className="mapa" />
    </div>
  );
}
