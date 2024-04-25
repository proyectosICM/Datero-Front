import React, { useState } from "react";
import { RutasModal } from "./RutasModal";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";
import { rutasURL } from "../../API/apiurls";
import "../../Styles/General.css";
import { CardRuta } from "./CardRuta";
export function RutasTabla({ url, il, abrir, cerrar }) { 
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);
  const empresaId = localStorage.getItem("empresaId");
  useListarElementos(url, setDatos);

  const agregarBus = (ruta) => {
    const requestData = {
      nombre: ruta.nombre,
      estado: ruta.estado,
      empresasModel: {
        id: empresaId,
      },
    };
    agregarElemento(rutasURL, requestData, closeModal);
  };

  const editarBus = (ruta) => {
    const requestData = {
      nombre: ruta.nombre,
      estado: ruta.estado,
      empresasModel: {
        id: empresaId,
      },
    };
    const apiurledit = `${rutasURL}/${ruta.id}`;
    editarElemento(apiurledit, requestData, closeModal);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(rutasURL, id, `estado`);
  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const closeModal = () => {
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
    </>
  );
}
