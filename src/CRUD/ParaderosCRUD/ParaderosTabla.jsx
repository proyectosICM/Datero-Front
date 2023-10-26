import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ParaderosModal } from "./ParaderosModal";
import { SiGooglemaps } from "react-icons/si";
import { Link } from "react-router-dom";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "./../../Hooks/CRUDHooks";
import { paraderosURL } from "../../API/apiurls";

export function ParaderosTabla({ url, abrir, cerrar }) {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);

  useListarElementos(url, setDatos);

  const agregarDistrito = (paradero) => {
    console.log(paradero);
    const requestData = {
      nombre: paradero.nombre,
      estado: paradero.estado,
      distritosModel: {
        id: paradero.distritosModel,
      },
      longitud: paradero.longitud,
      latitud: paradero.latitud,
    };
    agregarElemento(paraderosURL, requestData, closeModal);
  };

  const editarDistritos = (paradero) => {
    const requestData = {
      nombre: paradero.nombre,
      estado: paradero.estado,
      distritosModel: {
        id: paradero.distritosModel,
      },
      longitud: paradero.longitud,
      latitud: paradero.latitud,
    };
    const apiurledit = `${paraderosURL}/${paradero.id}`;
    editarElemento(apiurledit, requestData, closeModal);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(paraderosURL, id, `estado`);
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
                <BotonesDeGestion
                  ide={`id`}
                  estado={`estado`}
                  dato={dato}
                  edit={edit}
                  cambiarEstado={cambiarEstado}
                />
                <Button variant="info">
                  <Link to={`/paraderoxmap/${dato.nombre}/${dato.longitud}/${dato.latitud}`}>
                    <SiGooglemaps />
                    Ver en el mapa
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ParaderosModal show={showModal || abrir} close={closeModal} agregar={agregarDistrito} datosaeditar={datosEdit} editar={editarDistritos} />
    </>
  );
}
