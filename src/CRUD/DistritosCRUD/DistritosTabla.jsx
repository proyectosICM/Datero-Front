import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DistritoModal } from "./DistritosModal";


import { distritosURL } from '../../API/apiurls';
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";

export function DistritoTabla({ url, abrir, cerrar }) {

    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    useListarElementos(url, setDatos);


    const agregarDistrito = (distrito) => {
        agregarElemento(distritosURL, distrito, closeModal);
    };

    const editarDistritos = (distrito) => {
        const apiurledit = `${distritosURL}/${distrito.id}`;
        editarElemento(apiurledit, distrito, closeModal);
    };

    const cambiarEstado = (id) => {
        cambiarEstadoElemento(distritosURL, id, `estado`);
    };


    const edit = (bus) => {
        setDatosEdit(bus);
        setShowModal(true);
    }


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
                        <th>NOMBRE DEL DISTRITO</th>
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
                                <BotonesDeGestion
                                    ide={`id`} estado={`estado`} dato={dato} edit={edit}
                                    cambiarEstado={cambiarEstado}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DistritoModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarDistrito}
                datosaeditar={datosEdit}
                editar={editarDistritos}
            />
        </>
    );
}