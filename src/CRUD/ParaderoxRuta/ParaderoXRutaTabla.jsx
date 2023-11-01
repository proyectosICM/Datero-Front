import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ParaderoXRutaModal } from "./ParaderoXRutaModal";
import { BsArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import { RutasMapa } from "../RutasCRUD/RutasMapa";
import { rpURL, rpXRuta } from "../../API/apiurls";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";

export function ParaderoXRutaTabla() {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [datosEdit, setDatosEdit] = useState(null);

  const { ruta } = useParams();

  useListarElementos(`${rpXRuta}/${ruta}`, setDatos);
console.log(`${rpXRuta}/${ruta}dsad`)
  const agregarParaderoXRuta = (pr) => {
    console.log(pr);
    const requestData = {
      orden: 1,
      rutasModel: {
        id: ruta,
      },
      paraderosModel: {
        id: pr.paraderosModel,
      },
      estado: true,
    };
    agregarElemento(rpURL, requestData, closeModal);
  };

  const editarParaderoXRuta = (pr) => {
    const requestData = {
      orden: 1,
      rutasModel: {
        id: ruta,
      },
      paraderosModel: {
        id: pr.paraderosModel,
      },
      estado: true,
    };
    editarElemento(`${rpURL}/${pr.id}`, requestData, closeModal);
  };

  const cambiarEstado = (id) => {
    cambiarEstadoElemento(rpURL, id, `estado`);
  };

  const edit = (bus) => {
    setDatosEdit(bus);
    setShowModal(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-crud">
      <Button> Atras</Button>
      <div>
        <h1>RUTA {datos.length ? datos[0].rutasModel.nombre : "Cargando datos"}</h1>
        <h2>
          {datos.length
            ? datos[0].paraderosModel.distritosModel.nombre + " - " + datos[datos.length - 1].paraderosModel.distritosModel.nombre
            : "Cargando Datos"}
        </h2>
        <Button variant="success" onClick={openModal}>
          Crear
        </Button>
        <Button variant="success">Ver el mapa</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ORDEN</th>
            <th>NOMBRE DE LA RUTA</th>
            <th>NOMBRE DEL PARADERO</th>
            <th>DISTRITO</th>
            <th>GESTION</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.orden}</td>
              <td>{dato.rutasModel.nombre}</td>
              <td>{dato.paraderosModel.nombre}</td>
              <td>{dato.paraderosModel.distritosModel.nombre}</td>
              <td>
                <Button onClick={() => edit(dato)}>Editar</Button>
                <Button
                  variant={dato.estado ? "warning" : "primary"}
                  onClick={() => {
                    cambiarEstado(dato.id);
                  }}
                >
                  {dato.estado ? "Deshabilitar" : "Habilitar"}
                </Button>
                <Button variant="success">
                  <BsArrowUpCircleFill />
                </Button>
                <Button variant="danger">
                  <BsFillArrowDownCircleFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ParaderoXRutaModal show={showModal} close={closeModal} agregar={agregarParaderoXRuta} datosaeditar={datosEdit} editar={editarParaderoXRuta} />
{     /* <RutasMapa dat={datos} /> */}
    </div>
  );
}
