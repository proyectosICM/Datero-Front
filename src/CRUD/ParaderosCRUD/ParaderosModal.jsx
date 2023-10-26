import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsGlobeAmericas } from "react-icons/bs";
import { MdEditLocationAlt } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { distritosURL } from "../../API/apiurls";


export function ParaderosModal({ show, close, datosaeditar, editar, agregar, il }) {

    const [formData, setFormData] = useState({
        nombre: "",
        estado: true,
        distritosModel: null,
        latitud: "",
        longitud: ""

    });
    const [distritos, setDistritos] = useState([]);
    const [editando, setEditando] = useState(false);

    const ListarDistritos = useCallback(async () => {
        const response = await axios.get(distritosURL);
        setDistritos(response.data);
    }, []);


    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true)
        } else {
            limpiar();
        }
        ListarDistritos();
    }, [datosaeditar, ListarDistritos])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (
                updatedFormData.distritosModel &&
                typeof updatedFormData.distritosModel === "object"
            ) {
                updatedFormData.distritosModel = updatedFormData.distritosModel.id;
            }
            editar(updatedFormData);
            limpiar();
        } else {
            agregar(formData);
        }
        close();
        limpiar();
    }
 
    const limpiar = () => {
        setFormData({ nombre: "", estado: true, distritosModel: null, longitud: "", latitud: "" });
        setEditando(false);
    }

    
  const handleClose = () => {
    if (datosaeditar) {
      limpiar();
    }
    close();
  };


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><SiGooglemaps />Agregar paradero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <Form.Group className="form-group-half">
                                <Form.Label><SiGooglemaps />Nombre:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nom_par"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="form-group-half">
                                <Form.Label><BsGlobeAmericas />Distritos</Form.Label>
                                <Form.Select
                                    name="conductor"
                                    value={formData.distritosModel ? formData.distritosModel.id : ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        /*const selectedWorker = rutas.find(
                                            (worker) => worker === selectedId
                                        );*/
                                        setFormData({ ...formData, distritosModel: selectedId });
                                    }}
                                >
                                    <option value={formData.distritosModel ? formData.distritosModel.id : ""}>
                                        {formData.distritosModel ? formData.distritosModel.nombre
                                            : "Seleccione un distrito"}
                                    </option>
                                    {distritos.map((distrito) => (
                                        <option key={distrito.id} value={distrito.id}>
                                            {distrito.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>


                        <div className="form-row">
                            <Form.Group className="form-group-half">
                                <Form.Label><MdEditLocationAlt />Latitud:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="latitud"
                                    placeholder="latitud"
                                    value={formData.latitud}
                                    onChange={(e) => setFormData({ ...formData, latitud: e.target.value })}
                                />

                            </Form.Group>

                            <Form.Group className="form-group-half">
                                <Form.Label><MdEditLocationAlt />Longitud:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="longitud"
                                    placeholder="longitud"
                                    value={formData.longitud}
                                    onChange={(e) => setFormData({ ...formData, longitud: e.target.value })}
                                />
                            </Form.Group>
                        </div>


                        <Button type="submit">Crear</Button>
                        <Button onClick={handleClose}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}