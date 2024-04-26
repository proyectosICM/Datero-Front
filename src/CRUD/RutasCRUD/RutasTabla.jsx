import React, { useState } from "react";
import { RutasModal } from "./RutasModal";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useFetchData } from "../../Hooks/CRUDHooks";
import { rutasURL } from "../../API/apiurls";
import { CardRuta } from "./CardRuta";
import { PaginacionUtils } from "../../Hooks/paginationUtils";
import { requestDataRuta } from "../requestDataCrud";
import "../../Styles/General.css";

export function RutasTabla({ url, il, abrir, cerrar }) {
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);
  const empresaId = localStorage.getItem("empresaId");

  const [pageNumber, setPageNumber] = useState(0);

  const { datos, totalPages, currentPage, setCurrentPage, fetchData } = useFetchData(url, pageNumber);

  const agregarBus = (ruta) => {
    const requestData = requestDataRuta(ruta, empresaId);
    agregarElemento(rutasURL, requestData, closeModal);
    fetchData(pageNumber);
  };

  const editarBus = (ruta) => {
    const requestData = requestDataRuta(ruta, empresaId);
    const apiurledit = `${rutasURL}/${ruta.id}`;
    editarElemento(apiurledit, requestData, closeModal);
    fetchData(pageNumber);
  };

  const cambiarEstado = (id) => {
    fetchData(pageNumber);
    cambiarEstadoElemento(rutasURL, id, `estado`);

  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const closeModal = () => {
    fetchData(pageNumber);
    cerrar();
    setShowModal(false);
  };

  return ( 
    <>
      <div className="card-container">
        {datos.map((dato, index) => (
          <CardRuta key={index} dato={dato} edit={() => edit(dato)} cambiarEstado={() => cambiarEstado(dato.id)} />
        ))}
      </div>
      <RutasModal emp={empresaId} show={showModal || abrir} close={closeModal} agregar={agregarBus} datosaeditar={datosEdit} editar={editarBus} />
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
