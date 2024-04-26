import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ParaderosModal } from "./ParaderosModal";
import { SiGooglemaps } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useFetchData, useListarElementos } from "./../../Hooks/CRUDHooks";
import { paraderosURL } from "../../API/apiurls";
import { PaginacionUtils } from "../../Hooks/paginationUtils";
import { requestDataParadero } from "../requestDataCrud";

export function ParaderosTabla({ url, abrir, cerrar }) {
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);
  const navigation = useNavigate();

  const [pageNumber, setPageNumber] = useState(0);

  const { datos, totalPages, currentPage, setCurrentPage, fetchData } = useFetchData(url, pageNumber);

  const agregarParadero = (paradero) => {
    const requestData = requestDataParadero(paradero);
    agregarElemento(paraderosURL, requestData, closeModal);
    fetchData(pageNumber);
  };

  const editarParadero = (paradero) => {
    const requestData = requestDataParadero(paradero);
    const apiurledit = `${paraderosURL}/${paradero.id}`;
    editarElemento(apiurledit, requestData, closeModal);
    fetchData(pageNumber);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(paraderosURL, id, `estado`);
    fetchData(pageNumber);
  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    cerrar();
    setDatosEdit(null);
    fetchData(pageNumber);
  };

  const handleVerEnMapa = (dato) => {
    localStorage.setItem("paraderoNombre", dato.nombre);
    localStorage.setItem("longitud", dato.longitud);
    localStorage.setItem("latitud", dato.latitud);
    navigation("/paradero-en-mapa");
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>PARADEROS</th>
            <th>NOMBRE DEL DISTRITO</th>
            <th>COORDENADAS</th>
            <th>ESTADO</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombre}</td>
              <td>{dato.distritosModel.nombre}</td>
              <td>
                {dato.latitud} {dato.latitud & dato.longitud ? "," : "No hay coordenadas registradas"} {dato.longitud}{" "}
              </td>
              <td>{dato.estado ? "Habilitado" : "Deshabilitado"}</td>
              <td>
                <BotonesDeGestion ide={`id`} estado={`estado`} dato={dato} edit={edit} cambiarEstado={cambiarEstado} />
                <Button variant="info" onClick={() => handleVerEnMapa(dato)}>
                  <SiGooglemaps />
                  Ver en el mapa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ParaderosModal show={showModal || abrir} close={closeModal} agregar={agregarParadero} datosaeditar={datosEdit} editar={editarParadero} />
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
