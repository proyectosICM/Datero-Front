import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useListarElementos } from "../../../Hooks/CRUDHooks";

export function PanelHistorialBus() {
  const navigation = useNavigate();

  const [datos, setDatos] = useState([]);


    useListarElementos("http://localhost:8080/api/conteoB/last-7-days-ordered", setDatos);

  // Función para agrupar datos por día
  const agruparPorDia = (datos) => {
    const grupos = {};
    datos.forEach((dato) => {
      const diaKey = dato.dia.join("-");
      if (!grupos[diaKey]) {
        grupos[diaKey] = [];
      }
      grupos[diaKey].push(dato);
    });
    return grupos;
  };

  const datosAgrupados = agruparPorDia(datos);

  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/panel-bus`)}>
        Atras
      </Button>
      <h1>Historial últimos 7 días</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Día</th>
            <th colSpan={2}>Directo</th>
            <th colSpan={2}>Urbano</th>
            <th colSpan={2}>Interurbano</th>
            <th colSpan={2}>Zonal</th>
            <th colSpan={2}>Personalizado</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(datosAgrupados).map((diaKey, index) => (
            <tr key={index}>
              <td>{diaKey}</td>
              {datosAgrupados[diaKey].map((dato, subIndex) => (
                <React.Fragment key={subIndex}>
                  <td>{dato.servicios[0].nombre}</td>
                  <td>{dato.servicios[0].conteo}</td>
                  {/* Agrega aquí las columnas para otros servicios si es necesario */}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
