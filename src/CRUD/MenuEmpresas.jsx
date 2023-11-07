import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import '../Styles/MenuCRUD.css'
import { empresasEstado } from "../API/apiurls";

export function MenuEmpresas() {
    const { ruta } = useParams(); // Obtener los parámetros de la ruta
    const [datos, setDatos] = useState([]);

    const ListarDatos = useCallback(async () => {
        try {
            const response = await axios.get(`${empresasEstado}/1`);
            setDatos(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
 
    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    return (
        <div className="container-crud">
            {datos.map((dato, index) => (
                <Card className="crud-card" key={index}>
                    <Card.Body>
                        <Card.Title>{dato.nombre}</Card.Title>
                        <Link to={`/${ruta}/${dato.id}`}> {/* Usar la variable 'ruta' */}
                            <Button variant="primary" className="btn-l">Seleccionar</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}