import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { RolesModal } from "./RolesModal";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";
import { rolesURL } from "../../API/apiurls";

export function RolesTabla({ url, abrir, cerrar }) {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);

  useListarElementos(url, setDatos);

  const agregarRol = (rol) => {
    agregarElemento(rolesURL, rol, closeModal);
  };

  const editarRol = (rol) => {
    const apiurledit = `${rolesURL}/${rol.id}`;
    editarElemento(apiurledit, rol, closeModal);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(rolesURL, id, `estado`);
  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    cerrar();
    setDatosEdit(null);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE DEL ROL</th>
            <th>ESTADO</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombre}</td>
              <td>{dato.estado ? "Habilitada" : "Deshabilitada"}</td>
              <td>
                <BotonesDeGestion ide={`id`} estado={`estado`} dato={dato} edit={edit} cambiarEstado={cambiarEstado} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <RolesModal show={showModal || abrir} close={closeModal} agregar={agregarRol} datosaeditar={datosEdit} editar={editarRol} />
    </>
  );
}
