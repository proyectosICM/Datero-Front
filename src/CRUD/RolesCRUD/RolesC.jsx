import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { RolesTabla } from "./RolesTabla";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { rolesEstado, rolesURL } from "../../API/apiurls";

export function RolesC(){
    const {id_emp} = useParams();
    const [mostrartabla, setMostrarTabla] = useState(true)
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const [abrir, setAbrir] = useState(false);

    const urlT = `${rolesURL}`;
    const urlH = `${rolesEstado}/1`
    const urlD = `${rolesEstado}/0`

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
        setMostrarTabla(true);
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
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal}  retroceder="/CRUD" />
            {tablaSeleccionada === "Habilitados" && (
                <RolesTabla il={id_emp} url={urlH} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <RolesTabla il={id_emp} url={urlD} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
            {tablaSeleccionada === "Todos" && (
                <RolesTabla il={id_emp} url={urlT} abrir={abrir} cerrar={handleCerrarModal}/>
            )}
        </div>
    );
}