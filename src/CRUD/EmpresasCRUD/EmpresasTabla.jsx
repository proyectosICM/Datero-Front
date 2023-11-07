import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { EmpresaModal } from "./EmpresasModal.jsx";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { empresasURL } from "../../API/apiurls";
import { agregarElemento, editarElemento, useListarElementos, cambiarEstadoElemento } from "../../Hooks/CRUDHooks.jsx";

export function EmpresasTabla({ url, abrir, cerrar }) {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);
 
  useListarElementos(url, setDatos);

  const agregarEmpresa = (empresa) => {
    agregarElemento(empresasURL, empresa, closeModal);
  };

  const editarEmpresa = (empresa) => {
    const apiurledit = `${empresasURL}/${empresa.id}`;
    editarElemento(apiurledit, empresa, closeModal);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(empresasURL, id, `estado`);
  };
  
  const edit = (empresa) => {
    setDatosEdit(empresa);
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
            <th>NOMBRE</th>
            <th>ESTADO</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombre}</td>
              <td>{dato.estado ? "Habilitado" : "Deshabilitado"}</td>
              <td>
                <BotonesDeGestion ide={`id`} estado={`estado`} dato={dato} edit={edit} cambiarEstado={cambiarEstado} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EmpresaModal show={showModal || abrir} close={closeModal} agregar={agregarEmpresa} datosaeditar={datosEdit} editar={editarEmpresa} />
    </>
  );
}