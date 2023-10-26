import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function DistritoModal({show, close, datosaeditar, editar, agregar}){

    const [formData,setFormData] = useState({
        nombre: "",
        estado: true
    });

    useEffect(()=>{
        if(datosaeditar){
            setFormData(datosaeditar);
        } else {
            limpiar();
        }
    },[datosaeditar])
 
    const handleSubmit = (event) => {
        event.preventDefault();
        if(datosaeditar){
            editar(formData);
        } else {
            agregar(formData);
        }
        close();
        limpiar();
    }

    const limpiar = () =>{
        setFormData({ nombre: "", estado: true });
    }

    const handleClose = () => {
        if (datosaeditar) {
          limpiar();
        }
        close();
      };
    
 
    return(
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Nombre de la empresa</Form.Label>
                        <Form.Control 
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                        <Button type="submit">Crear</Button>
                        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    );
}