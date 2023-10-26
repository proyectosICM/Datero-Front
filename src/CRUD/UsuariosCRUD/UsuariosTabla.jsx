import axios from "axios";
import React, {useState } from "react";
import { Table } from "react-bootstrap";
import { UsuariosModal } from "./UsuariosModal";
import { BotonesDeGestion } from "../../Common/BotonesDeGestion";
import { usuariosURL } from "../../API/apiurls";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";

export function UsuariosTabla({ url, il, abrir, cerrar }) {

    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    useListarElementos(url, setDatos);

    const agregarTrabajador = (usuario) => {
        const requestData = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            username: usuario.username,
            password: usuario.password,
            empresasModel: {
                id: il
            },
            rolesModel: {
                id: usuario.rolesModel
            },
            estado: usuario.estado
        };
        agregarElemento(usuariosURL, requestData, closeModal);
    };

    const editarTrabajador = (usuario) => {
        const requestData = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            username: usuario.username,
            password: usuario.password,
            empresasModel: {
                id: il
            },
            rolesModel: {
                id: usuario.rolesModel
            },
            estado: usuario.estado
        };
        const apiurledit = `${usuariosURL}/${usuario.id}`;
        editarElemento(apiurledit, requestData, closeModal);
    };

    const cambiarEstado = (id) => {
        cambiarEstadoElemento(usuariosURL, id, `estado`);
      };
      



    const edit = (trabajador) => {
        setDatosEdit(trabajador);
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
                            <td>{dato.nombre} {dato.apellido}</td>
                            <td>{dato.dni}</td>
                            <td>{dato.empresasModel.nombre}</td>
                            <td>{dato.username}</td>
                            <td>{dato.password}</td>
                            <td>{dato.rolesModel.nombre}</td>
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
            <UsuariosModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarTrabajador}
                datosaeditar={datosEdit}
                editar={editarTrabajador}
                il={il}
            />
        </>
    );
}