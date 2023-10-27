import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { paraderosEstado } from "../../API/apiurls";
import { useListarElementos } from "../../Hooks/CRUDHooks";
 
export function ParaderoXRutaModal({ show, close, datosaeditar, editar, agregar, emp }) {

    const [formData, setFormData] = useState({
        paraderosModel: null
    });
    const [paraderos, setParaderos] = useState([]);
    const [editando, setEditando] = useState(false);

    const d = 1

    useListarElementos(`${paraderosEstado}/1`, setParaderos);
/*
    const ListarDistritos = useCallback(async () => {
        const response = await axios.get(`${paraderosEstado}/1`);
        setParaderos(response.data);
    }, []);
*/
    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true);
        }
        //ListarDistritos();
    }, [datosaeditar]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (updatedFormData.paraderosModel && typeof updatedFormData.paraderosModel === "object") {
                updatedFormData.paraderosModel = updatedFormData.paraderos.id;
            }
            editar(updatedFormData);
        } else {
            agregar(formData);
        }
        close();
        limpiar();

    }

    const limpiar = () => {
        setEditando(false);
    }

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Paradero de ruta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Paradero</Form.Label>
                        <Form.Select
                            name="ruta"
                            value={formData.paraderosModel ? formData.paraderosModel.id : ""}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                setFormData({ ...formData, paraderosModel: selectedId });
                            }}
                        >
                            <option  value={formData.paraderosModel ? formData.paraderosModel.id : ""}>
                                {formData.paraderosModel ? formData.paraderosModel.nombre : "Seleccione una paradero"}
                            </option>
                            {paraderos.map((paradero) => (
                                <option key={paradero.id} value={paradero.id}>
                                    {paradero.nombre}
                                </option>
                            ))}
                        </Form.Select>

                        <div className="modal-buttons">
                            <Button type="submit">
                                {editando ? "Guardar cambios" : "Crear"}
                            </Button>
                            <Button onClick={close} variant='secondary'>
                                <BsX className="button-icon" />
                                Cerrar
                            </Button>
                            </div>
                    </Form>
                            </Modal.Body>
            </Modal>
        </>
    );
}