import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UsuariosModal } from "./UsuariosModal";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { usuariosURL } from "../../API/apiurls";
import { ListPaginatedData, agregarElemento, cambiarEstadoElemento, editarElemento, useFetchData, useListarElementos } from "../../Hooks/CRUDHooks";
import { PaginacionUtils } from "../../Hooks/paginationUtils";
import { requestDataRuta, requestDataUsuario } from "../requestDataCrud";

export function UsuariosTabla({ url, abrir, cerrar }) {
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);

  const empresaId = localStorage.getItem("empresaId");


  const [pageNumber, setPageNumber] = useState(0);

  const { datos, totalPages, currentPage, setCurrentPage, fetchData } = useFetchData(url, pageNumber);

  const agregarTrabajador = (usuario) => {
    const requestData = requestDataUsuario(usuario, empresaId);
    agregarElemento(usuariosURL, requestData, closeModal);
    fetchData(pageNumber);
  };

  const editarTrabajador = (usuario) => {
    const requestData = requestDataUsuario(usuario, empresaId);
    const apiurledit = `${usuariosURL}/${usuario.id}`;
    editarElemento(apiurledit, requestData, closeModal);
    fetchData(pageNumber);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(usuariosURL, id, `estado`);
  };

  const edit = (trabajador) => {
    setDatosEdit(trabajador);
    setShowModal(true);
  };

  const closeModal = () => {
    fetchData(pageNumber);
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
            <th>NOMBRE</th>
            <th>DNI</th>
            <th>EMPRESA</th>
            <th>NOMBRE DE USUARIO</th>
            <th>CONTRASEÑA</th>
            <th>ESTADO</th>
            <th>ROL</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>
                {dato.nombre} {dato.apellido}
              </td>
              <td>{dato.dni}</td>
              <td>{dato.empresasModel.nombre}</td>
              <td>{dato.username}</td>
              <td>{dato.password}</td>
              <td>{dato.rolesModel.nombre}</td>
              <td>{dato.estado ? "Habilitado" : "Deshabilitado"}</td>
              <td>
                <BotonesDeGestion ide={`id`} estado={`estado`} dato={dato} edit={edit} cambiarEstado={cambiarEstado} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UsuariosModal
        show={showModal || abrir}
        close={closeModal}
        agregar={agregarTrabajador}
        datosaeditar={datosEdit}
        editar={editarTrabajador}
        il={empresaId}
      />
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
