import React from "react";
import { Table } from "react-bootstrap";

export function TablaMonitoreo() {
  return (
    <div className="tabla">
      <h1>Monitoreo de vehículos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PLACA</th>
            <th>TIEMPO</th>
            <th>DIRECION</th>
            <th>RUTA</th>
          </tr>
        </thead>
        <tbody>
          <tr key="1">
            <td>ABC</td>
            <td>Prueba</td>
            <td>IDA</td>
            <td>RC-02</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
