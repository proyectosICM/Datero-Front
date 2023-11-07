import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useListarElementos } from "../../../Hooks/CRUDHooks";
import { registrorutaxbus } from "../../../API/apiurls";

export function PanelRegistros() {
  const [datos, setDatos] = useState();
  const idbus = 1;

  useListarElementos(`${registrorutaxbus}${idbus}`, setDatos);

  return (
    <div className="panel-registros">
      <div style={{ width: "100%" }}>
        <h5>Registro de Ruta</h5>
      </div>

      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Placa</th>
            <th style={{ textAlign: "center" }}>Paradero</th>
            <th style={{ textAlign: "center" }}>Hora Esperada</th>
            <th style={{ textAlign: "center" }}>Hora de Llegada</th>
          </tr>
        </thead>
        <tbody>
          {datos && datos.map((dato) => (
              <tr key={dato.id}>
                <td style={{ textAlign: "center" }}>{dato.busesModel.placa}</td>
                <td style={{ textAlign: "center" }}>{dato.paraderosModel.nombre}</td>
                <td style={{ textAlign: "center" }}>{dato.horaEsperada}</td>
                <td style={{ textAlign: "center" }}>{dato.horaLlegada}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
