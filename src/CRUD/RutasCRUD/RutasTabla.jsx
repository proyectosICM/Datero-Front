import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { RutasModal } from "./RutasModal";
import { Link } from "react-router-dom";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";
import { rutasURL } from "../../API/apiurls";
import "../../Styles/General.css";
import { CardRuta } from "./CardRuta";
export function RutasTabla({ url, il, abrir, cerrar }) {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);

  useListarElementos(url, setDatos);
  

  const agregarBus = (ruta) => {
    const requestData = {
      nombre: ruta.nombre,
      estado: ruta.estado,
      empresasModel: {
        id: il,
      },
    };
    agregarElemento(rutasURL, requestData, closeModal);
  };

  const editarBus = (ruta) => {
    const requestData = {
      nombre: ruta.nombre,
      estado: ruta.estado,
      empresasModel: {
        id: il,
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
        {datos.map((dato) => (
          <CardRuta dato={dato} edit={() => edit(dato)} cambiarEstado = {() => cambiarEstado(dato.id)} />
        ))}
      </div>
      <RutasModal emp={il} show={showModal || abrir} close={closeModal} agregar={agregarBus} datosaeditar={datosEdit} editar={editarBus} />
    </>
  );
}
