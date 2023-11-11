import React, { useEffect, useState, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { busesEmpresa, busesURL } from '../API/apiurls';
import busIcon from '../Images/busesIcono.png';

export function MapaBuses({buses}) {


  // Referencia para almacenar la instancia del mapa
  const mapRef = useRef(null);

  // Inicializar el mapa solo una vez
  useEffect(() => {
    if (!mapRef.current && buses) {
      // Filtrar los buses que tienen coordenadas válidas
      const busesConCoordenadas = buses.filter(bus => bus.latitud && bus.longitud);

      // Inicializar el mapa con tu clave de API
      const map = tt.map({
        key: "h7fg9TqEyAohgMGDrKynpp3vqsXdB9ZF", // Reemplaza con tu clave de API de TomTom
        container: "map",
        center: [-76.954401, -12.025722], // Puedes ajustar esto según tus necesidades
        zoom: 15,
      });

      // Crear marcadores para cada bus con icono personalizado y título
      busesConCoordenadas.forEach(bus => {
        const marker = new tt.Marker({
          element: createCustomMarker(bus.placa), // Llama a la función para crear un icono personalizado
        }).setLngLat([bus.longitud, bus.latitud]).addTo(map);
      });

      // Ajustar el centro y el zoom del mapa para mostrar todos los marcadores
      const bounds = new tt.LngLatBounds();
      busesConCoordenadas.forEach(bus => {
        bounds.extend([bus.longitud, bus.latitud]);
      });
      map.fitBounds(bounds, { padding: 50 });

      // Actualizar la referencia con la instancia del mapa
      mapRef.current = map;
    }
  }, [buses]);

  // Función para crear un icono personalizado (imagen de autobús) con título
  const createCustomMarker = (title) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundImage = `url(${busIcon})`;
    markerElement.style.width = '8em';
    markerElement.style.height = '8em';

    // Crear un elemento de título
    const titleElement = document.createElement('div');
    titleElement.className = 'custom-marker-title';
    titleElement.textContent = title;
    markerElement.appendChild(titleElement);

    return markerElement;
  };

  return (
    <div id="map"></div>
  );
}
