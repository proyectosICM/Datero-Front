import React, { useState } from "react";
import { ParaderosTabla } from "./ParaderosTabla";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { paraderosEstado, paraderosURL } from "../../API/apiurls";

export function ParaderosC(){

    const [abrir, setAbrir] = useState()
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const urlT = paraderosURL;
    const urlH = `${paraderosEstado}/1`;
    const urlD = `${paraderosEstado}/0`;
    const backURL = localStorage.getItem("backURL");
    const handleMostrarTabla = (tabla) =>{
        setTablaSeleccionada(tabla);
    }
    
    const handleAbrirModal = () => {
        if(!abrir){ 
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }

    const handleCerrarModal = () => {
        if(abrir){
            setAbrir(false);
        }
    }

    return(
        <div className="container-crud">
            <div className="set-botones">
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder={backURL} />
            </div>

            {tablaSeleccionada === "Habilitados" && (
                <ParaderosTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <ParaderosTabla url={urlD} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Todos" && (
                <ParaderosTabla url={urlT} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
        </div>
    );
}