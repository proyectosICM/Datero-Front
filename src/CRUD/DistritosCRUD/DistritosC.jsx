import React, { useState } from "react";
import { DistritoTabla } from "./DistritosTabla";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import {distritosURL, distritosEstado} from '../../API/apiurls';

export function DistritoC(){

    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const urlT = distritosURL;
    const urlH = `${distritosEstado}/1`;
    const urlD = `${distritosEstado}/0`;

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }

    const [abrir, setAbrir] = useState(false);

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
            console.log(abrir);
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
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/CRUD" />
            </div>

            {tablaSeleccionada === "Habilitados" && (
                <DistritoTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <DistritoTabla url={urlD} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Todos" && (
                <DistritoTabla url={urlT} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
        </div>
    );
}