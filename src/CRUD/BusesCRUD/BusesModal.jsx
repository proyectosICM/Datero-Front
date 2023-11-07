import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsFillBusFrontFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { InputSimple, SelectCruzado } from "../../Common/forms";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { rutasURL, usuariosURL } from "../../API/apiurls";

export function BusesModal({ show, close, datosaeditar, editar, agregar, emp }) {

    const [trabajadores, setTrabajadores] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [editando, setEditando] = useState(false);

    useListarElementos(usuariosURL, setTrabajadores);

    useListarElementos(rutasURL, setRutas);
    
    const [formData, setFormData] = useState({
        modelo: "",
        placa: "",
        estado: true,
        usuariosModel: null,
        rutasModel: null
    });

    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true)
        } else {
            limpiar();
        }
        // ListarTrabajadores();
        // ListarRutas();
    }, [datosaeditar])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (
                updatedFormData.usuariosModel &&
                typeof updatedFormData.usuariosModel === "object" && updatedFormData.rutasModel &&
                typeof updatedFormData.rutasModel === "object"
            ) {
                updatedFormData.usuariosModel = updatedFormData.usuariosModel.id;
                updatedFormData.rutasModel = updatedFormData.rutasModel.id;
            } else if (
                updatedFormData.rutasModel &&
                typeof updatedFormData.rutasModel === "object"
            ) {
                updatedFormData.rutasModel = updatedFormData.rutasModel.id;
            } else if (
                updatedFormData.usuariosModel &&
                typeof updatedFormData.usuariosModel === "object"
            ) {
                updatedFormData.usuariosModel = updatedFormData.usuariosModel.id
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
        setFormData({ placa: "", modelo: "", estado: true, usuariosModel: null, rutasModel: null });
        //setFormData({ placa_bus: "", mod_bus: "", est_bus: true, trabajadoresModel:null, rutasModel:null });
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
                    <Modal.Title><BsFillBusFrontFill /> Agregar Buses</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <SelectCruzado
                                val={formData.rutasModel ? formData.rutasModel.id : ""}
                                namer={formData.rutasModel ? formData.rutasModel.nombre : "Seleccione una ruta"}
                                onChan={(e) => {
                                    const selectedId = e.target.value;
                                    setFormData({ ...formData, rutasModel: selectedId });
                                }}
                                arr={rutas}
                                idField="id"
                                displayField="nombre"
                            />

                            <InputSimple label="Modelo" setDatos={setFormData} val={formData.modelo}
                                onChan={(e) => setFormData({ ...formData, modelo: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <InputSimple label="Placa" setDatos={setFormData} val={formData.placa}
                                onChan={(e) => setFormData({ ...formData, placa: e.target.value })}
                            />


                            <Form.Group className="form-group-half">
                                <Form.Label><FaUser /> Conductor</Form.Label>
                                <Form.Select
                                    name="conductor"
                                    value={formData.usuariosModel ? formData.usuariosModel.id : ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFormData({ ...formData, usuariosModel: selectedId });
                                    }}
                                >
                                    <option value={formData.usuariosModel ? formData.usuariosModel.id : ""}>
                                        {formData.usuariosModel ? formData.usuariosModel.nombre + " " + formData.usuariosModel.apellido
                                            : "Seleccione una ruta"}
                                    </option>
                                    {trabajadores.map((trabajador) => (
                                        <option key={trabajador.id} value={trabajador.id}>
                                            {trabajador.nombre} {trabajador.apellido}
                                        </option>
                                    ))}
                                </Form.Select>
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