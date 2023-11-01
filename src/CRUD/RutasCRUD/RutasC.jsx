import React, { useState } from "react";
import { RutasTabla } from "./RutasTabla";
import { useParams } from "react-router-dom";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { rutasEmpresa, rutasEmpresaEstado } from "../../API/apiurls";

export function RutasC() {

    const { id } = useParams();
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");

    const urlT = `${rutasEmpresa}/${id}`
    const urlH = `${rutasEmpresaEstado}/${id}/1`
    const urlD = `${rutasEmpresaEstado}/${id}/0`

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    };

    const [abrir, setAbrir] = useState(false);

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    };

    const handleCerrarModal = () => {
        if(abrir){
            setAbrir(false);
        }
    };

    return (
        <div className="container-crud">
            <div className="set-botones">
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/"/>
            </div>
  
                {tablaSeleccionada === "Habilitados" && (
                    <RutasTabla il={id} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
                )}
                {tablaSeleccionada === "Deshabilitados" && (
                    <RutasTabla il={id} url={urlD} abrir={abrir} cerrar={handleCerrarModal}/>
                )}
                {tablaSeleccionada === "Todos" && (
                    <RutasTabla il={id} url={urlT} abrir={abrir} cerrar={handleCerrarModal}/>
                )}
        </div>
    );
}