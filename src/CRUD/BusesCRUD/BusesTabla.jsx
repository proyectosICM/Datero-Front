import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { BusesModal } from "./BusesModal";
import { busesURL } from "../../API/apiurls";
import { agregarElemento, editarElemento, useListarElementos, cambiarEstadoElemento } from "../../Hooks/CRUDHooks.jsx";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";

export function BusesTabla({ il, url, abrir, cerrar }) {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);

  useListarElementos(url, setDatos);

  const agregarBus = (bus) => {
    console.log(bus);
    const requestData = {
      modelo: bus.modelo,
      placa: bus.placa,
      estado: bus.estado,
      usuariosModel: {
        id: bus.trabajadoresModel,
      },
      empresasModel: {
        id: il,
      },
      rutasModel: {
        id: bus.rutasModel,
      },
    };

    agregarElemento(busesURL, requestData, closeModal);
  };

  const editarBus = (bus) => {
    const requestData = {
      modelo: bus.modelo,
      placa: bus.placa,
      estado: bus.estado,
      usuariosModel: {
        id: bus.usuariosModel,
      },
      empresasModel: {
        id: il,
      },
      rutasModel: {
        id: bus.rutasModel,
      },
    };
    const apiurledit = `${busesURL}/${bus.id}`;
    console.log(requestData)
    editarElemento(apiurledit, requestData, closeModal);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(busesURL, id, `estado`);
  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const closeModal = () => {
    cerrar();
    setShowModal(false);
    setDatosEdit(null);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ruta</th>
            <th>PLACA</th>
            <th>MODELO</th>
            <th>CONDUCTOR</th>
            <th>EMPRESA</th>
            <th>ESTADO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.rutasModel && dato.rutasModel.nombre}</td>
              <td>{dato.placa}</td>
              <td>{dato.modelo}</td>
              <td>
                {dato.usuariosModel && dato.usuariosModel.nombre} {dato.usuariosModel && dato.usuariosModel.apellido}
              </td>
              <td>{dato.empresasModel.nombre}</td>
              <td>{dato.estado ? "Habilitado" : "Deshabilitado"}</td>
              <td>
                <BotonesDeGestion ide={`id`} estado={`estado`} dato={dato} edit={edit} cambiarEstado={cambiarEstado}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BusesModal emp={il} show={showModal || abrir} close={closeModal} agregar={agregarBus} datosaeditar={datosEdit} editar={editarBus} />
    </>
  );
}
