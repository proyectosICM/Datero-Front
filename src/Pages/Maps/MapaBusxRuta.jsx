import React, { useEffect, useRef, useState } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import paraderoIcon from "../../Images/paraderoS.png";
import busIcon from '../../Images/busesIcono.png';

export function MapaBusxRuta({ bus, ruta }) {
  const mapRef = useRef(null);
  const busMarkerRef = useRef(null);
  const [prevBusCoordinates, setPrevBusCoordinates] = useState({});

  // Inicializar el mapa solo una vez
  useEffect(() => {
    if (!mapRef.current && ruta && bus && bus.longitud && bus.latitud) {
      // Inicializar el mapa con tu clave de API
      const map = tt.map({
        key: "h7fg9TqEyAohgMGDrKynpp3vqsXdB9ZF", // Reemplaza con tu clave de API de TomTom
        container: "map",
        center: [bus.longitud, bus.latitud], // Centrar el mapa en la posición del autobús
        zoom: 15,
      });   

      // Crear un marcador para el autobús con un ícono diferente
      const busMarker = new tt.Marker({ element: createCustomMarker(busIcon) })
        .setLngLat([bus.longitud, bus.latitud])
        .addTo(map);

      // Ajustar el centro y el zoom del mapa para mostrar el marcador del autobús
      const bounds = new tt.LngLatBounds();
      bounds.extend([bus.longitud, bus.latitud]);

      // Agregar marcadores para los paraderos de la ruta (ejemplo, asegúrate de tener las coordenadas de los paraderos)
      ruta.forEach(r => {
        const paraderoMarker = new tt.Marker({ element: createCustomMarker(paraderoIcon) })
          .setLngLat([r.paraderosModel.longitud, r.paraderosModel.latitud])
          .addTo(map);
        bounds.extend([r.paraderosModel.longitud, r.paraderosModel.latitud]);
      });

      // Ajustar el centro y el zoom del mapa para mostrar todos los marcadores
      map.fitBounds(bounds, { padding: 50 });

      // Actualizar las referencias con la instancia del mapa y el marcador del autobús
      mapRef.current = map;
      busMarkerRef.current = busMarker;
      setPrevBusCoordinates({ longitud: bus.longitud, latitud: bus.latitud });
    } else if (busMarkerRef.current && bus && bus.longitud && bus.latitud) {
      // Verificar si las coordenadas del autobús han cambiado antes de actualizar el marcador y renderizar el mapa
      if (bus.longitud !== prevBusCoordinates.longitud || bus.latitud !== prevBusCoordinates.latitud) {
        // Actualizar la posición del marcador del autobús cuando cambian las coordenadas
        busMarkerRef.current.setLngLat([bus.longitud, bus.latitud]);
        setPrevBusCoordinates({ longitud: bus.longitud, latitud: bus.latitud });
        console.log("mapa renderizado");
      }
    }
  }, [bus, ruta, prevBusCoordinates]);

  // Función para crear un marcador personalizado con un ícono
  const createCustomMarker = (icon) => {
    const markerElement = document.createElement("div");
    markerElement.className = "custom-marker";
    markerElement.style.backgroundImage = `url(${icon})`;
    markerElement.style.width = "60px";
    markerElement.style.height = "60px";
    return markerElement;
  };

  return <div id="map" style={{ height: "100%", borderRadius: "25px" }}></div>;
}
