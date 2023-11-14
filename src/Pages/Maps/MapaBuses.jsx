import React, { useEffect, useState, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import busIcon from '../../Images/busesIcono.png';
import paraderoIcon from '../../Images/paraderoS.png';


export function MapaBuses({buses, tipo}) {


  // Referencia para almacenar la instancia del mapa
  const mapRef = useRef(null);

  // Inicializar el mapa solo una vez
  useEffect(() => {
    if (!mapRef.current && buses) {
      // Filtrar los buses que tienen coordenadas válidas

      let busesConCoordenadas;

      if (tipo === "bus") {
        busesConCoordenadas = buses.filter(bus => bus.latitud && bus.longitud);
      } else if (tipo === "paradero") {
        busesConCoordenadas = buses.filter(bus => bus.paraderosModel.latitud && bus.paraderosModel.longitud);
      }
      console.log(busesConCoordenadas)

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
          element: createCustomMarker(tipo === 'bus' ? bus.placa : bus.nombre), // Llama a la función para crear un icono personalizado
        }).setLngLat(tipo === 'bus' ?  [bus.longitud, bus.latitud] : [bus.paraderosModel.longitud, bus.paraderosModel.latitud] ).addTo(map);
      });

      // Ajustar el centro y el zoom del mapa para mostrar todos los marcadores
      const bounds = new tt.LngLatBounds();
      busesConCoordenadas.forEach(bus => {
        if (tipo === 'bus') {
          bounds.extend([bus.longitud, bus.latitud]);
        } else {
          bounds.extend([bus.paraderosModel.longitud, bus.paraderosModel.latitud]);
        }
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
    markerElement.style.backgroundImage = `url(${tipo === "bus" ? busIcon : paraderoIcon})`;
    markerElement.style.width = "60px";
    markerElement.style.height = "60px";

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
