import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BusesModal } from "./BusesModal";
import { busesURL } from "../../API/apiurls";
import {
  agregarElemento,
  editarElemento,
  useListarElementos,
  cambiarEstadoElemento,
  ListPaginatedData,
  useFetchData,
} from "../../Hooks/CRUDHooks.jsx";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { PaginacionUtils } from "../../Hooks/paginationUtils.jsx";
import { requestDataBus } from "../requestDataCrud.jsx";

export function BusesTabla({ url, abrir, cerrar }) {
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);
  const empresaId = localStorage.getItem("empresaId");

  const [pageNumber, setPageNumber] = useState(0);

  const { datos, totalPages, currentPage, setCurrentPage, fetchData } = useFetchData(url, pageNumber);
 
  const agregarBus = (bus) => {
    const requestData = requestDataBus(bus, empresaId);
    agregarElemento(busesURL, requestData, closeModal);
    fetchData(pageNumber);
  };

  const editarBus = (bus) => {
    const requestData = requestDataBus(bus, empresaId);
    const apiurledit = `${busesURL}/${bus.id}`;
    console.log(bus)
    console.log(requestData)
    editarElemento(apiurledit, requestData, closeModal);
    fetchData(pageNumber);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(busesURL, id, `estado`);
    fetchData(pageNumber);
  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const closeModal = () => {
    cerrar();
    setShowModal(false);
    setDatosEdit(null);
    fetchData(pageNumber);
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
                <BotonesDeGestion ide={`id`} estado={`estado`} dato={dato} edit={edit} cambiarEstado={cambiarEstado} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BusesModal emp={empresaId} show={showModal || abrir} close={closeModal} agregar={agregarBus} datosaeditar={datosEdit} editar={editarBus} />
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
