import React from "react";
import { Table } from "react-bootstrap";

export function PanelRegistros() {
  return (
    <div className="panel-registros">
      <div style={{width: "100%"}}>
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
          <tr>
            <td style={{ textAlign: "center" }}>ABC-456</td>
            <td style={{ textAlign: "center" }}>Pte Atocongo</td>
            <td style={{ textAlign: "center" }}>08:05</td>
            <td style={{ textAlign: "center" }}>08:10</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>ABC-456</td>
            <td style={{ textAlign: "center" }}>Primavera</td>
            <td style={{ textAlign: "center" }}>08:35</td>
            <td style={{ textAlign: "center" }}>08:40</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>ABC-456</td>
            <td style={{ textAlign: "center" }}>Perales</td>
            <td style={{ textAlign: "center" }}>09:12</td>
            <td style={{ textAlign: "center" }}>09:18</td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>ABC-456</td>
            <td style={{ textAlign: "center" }}>Pte Nuevo</td>
            <td style={{ textAlign: "center" }}>09:24</td>
            <td style={{ textAlign: "center" }}>09:30</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
