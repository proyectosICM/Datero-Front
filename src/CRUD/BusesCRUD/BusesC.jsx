import React, { useState } from "react";
import { BusesTabla } from "./BusesTabla";
import { useParams } from "react-router-dom";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { busesEmpresa, busesEmpresaEstado } from './../../API/apiurls';

 
export function BusesC() {

    const { id } = useParams();
    const [abrir, setAbrir] = useState(false);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");


    const urlT = `${busesEmpresa}/${id}`;
    const urlH = `${busesEmpresaEstado}/${id}/1`;
    const urlD = `${busesEmpresaEstado}/${id}/0`;



    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }

    const handleAbrirModal = () => {
        if (!abrir) {
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }

    const handleCerrarModal = () => {
        if (abrir) {
            setAbrir(false);
        }
    }

    return (
        <div className="container-crud">
            <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/CRUD" />

            {tablaSeleccionada === "Habilitados" && (
                <BusesTabla il={id} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <BusesTabla il={id} url={urlD} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Todos" && (
                <BusesTabla il={id} url={urlT} abrir={abrir} cerrar={handleCerrarModal} />
            )}

        </div>
    );
}