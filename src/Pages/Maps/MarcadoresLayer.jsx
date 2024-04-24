import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';

export const marcadorItem = (coordenadas) => {
    const markerFeature = new Feature({
        geometry: new Point(fromLonLat(coordenadas)),
    });
    return markerFeature;
}


export const generarEstiloMarcador = () => {
    return new Style({
      image: new Icon({
        src: require("../../Images/busesIcono.png"),
        anchor: [0.5, 1],
        scale: 0.09,
      }),
    });
  };