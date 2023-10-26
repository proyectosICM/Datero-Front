import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { RutasModal } from "./RutasModal";
import { Link } from "react-router-dom";
import { agregarElemento, cambiarEstadoElemento, editarElemento, useListarElementos } from "../../Hooks/CRUDHooks";
import { rutasURL } from "../../API/apiurls";
import '../../Styles/General.css'
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
                    <Card key={dato.id_ruta} className="custom-card">
                        <Card.Body>
                            <Card.Title>{dato.nombre}</Card.Title>
                            <Card.Text>
                                <strong>Empresa:</strong> {dato.empresasModel.nombre}
                            </Card.Text>
                            <Card.Text>
                                <strong>Estado:</strong>{" "}
                                {dato.estado ? "Habilitada" : "Deshabilitada"}
                            </Card.Text>

                            <div className="button-container">
                                <Button className="button" variant="success" onClick={() => edit(dato)}>
                                    Editar Nombre de Ruta
                                </Button>
                                <Button className="button" variant="success">
                                    <Link to={`/paraderoxruta/${dato.id}`}>Administrar Paraderos</Link>
                                </Button>
                                <Button className="button" variant="success" onClick={() => edit(dato)}>
                                    Ver ruta en el mapa
                                </Button>
                                <Button
                                    className="button"
                                    variant={dato.estado ? "warning" : "primary"}
                                    onClick={() => {
                                        if (dato.estado) {
                                            cambiarEstado(dato.id);
                                        } else {
                                            cambiarEstado(dato.id);
                                        }
                                    }}
                                >
                                    {dato.estado ? "Deshabilitar" : "Habilitar"}
                                </Button>
                            </div>

                        </Card.Body>
                    </Card>
                ))}
            </div>
            <RutasModal
                emp={il}
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarBus}
                datosaeditar={datosEdit}
                editar={editarBus}
            />
        </>
    );
}
