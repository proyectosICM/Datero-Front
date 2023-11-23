import React, { useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import paraderoIcon from "../../Images/paraderoS.png";
import busIcon from '../../Images/busesIcono.png';

export function MapaBusesYRutas({ buses, paraderos }) {
  const mapRef = useRef(null);
  const busMarkersRef = useRef([]);
  const paraderoMarkersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current && paraderos && paraderos.length > 0 && buses && buses.length > 0) {
      const bounds = new tt.LngLatBounds();
      buses.forEach((bus) => {
        if (bus.latitud && bus.longitud) {
          bounds.extend([bus.longitud, bus.latitud]);
        }
      });

      const map = tt.map({
        key: "h7fg9TqEyAohgMGDrKynpp3vqsXdB9ZF",
        container: "map",
        center: bounds.getCenter().toArray(),
        zoom: 10,
      });

      mapRef.current = map;

      buses.forEach((bus) => {
        if (bus.latitud && bus.longitud) {
          const marker = new tt.Marker({ element: createCustomMarker(busIcon) })
            .setLngLat([bus.longitud, bus.latitud])
            .addTo(mapRef.current);
          busMarkersRef.current.push(marker);
        }
      });

      paraderos.forEach((paradero) => {
        if (paradero.latitud && paradero.longitud) {
          const marker = new tt.Marker({ element: createCustomMarker(paraderoIcon) })
            .setLngLat([paradero.longitud, paradero.latitud])
            .addTo(mapRef.current);
          paraderoMarkersRef.current.push(marker);
        }
      });

      mapRef.current.fitBounds(bounds, { padding: 50 });
    } else {
      // Actualizar marcadores si cambian los buses o paraderos
      updateMarkers();
    }
  }, [buses, paraderos]);

  const updateMarkers = () => {
    busMarkersRef.current.forEach((marker, index) => {
      if (buses[index] && buses[index].latitud && buses[index].longitud) {
        marker.setLngLat([buses[index].longitud, buses[index].latitud]);
      }
    });

    paraderoMarkersRef.current.forEach((marker, index) => {
      if (paraderos[index] && paraderos[index].latitud && paraderos[index].longitud) {
        marker.setLngLat([paraderos[index].longitud, paraderos[index].latitud]);
      }
    });
  };

  const createCustomMarker = (icon) => {
    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker";
    markerElement.style.backgroundImage = `url(${icon})`;
    markerElement.style.width = "60px";
    markerElement.style.height = "60px";
    return markerElement;
  };

  return <div id="map" style={{ width: "100%", height: "500px", borderRadius: "25px" }}></div>;
}
