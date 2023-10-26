import React, { useState } from "react";
import { UsuariosTabla } from "./UsuariosTabla";
import { useParams } from "react-router-dom";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { trabajadorDURL, trabajadorHURL, trabajadorTURL, usuariosEmpresa, usuariosEmpresaEstado, usuariosEstado, usuariosURL } from "../../API/apiurls";

export function UsuariosC() {
  const { id } = useParams();
  const [abrir, setAbrir] = useState(false);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const urlT = `${usuariosEmpresa}/${id}`;
  const urlH = `${usuariosEmpresaEstado}/${id}/1`;
  const urlD = `${usuariosEmpresaEstado}/${id}/0`;


  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };



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
        <UsuariosTabla il={id} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
      )}
      {tablaSeleccionada === "Deshabilitados" && (
        <UsuariosTabla il={id} url={urlD} abrir={abrir} cerrar={handleCerrarModal} />
      )}
      {tablaSeleccionada === "Todos" && (
        <UsuariosTabla il={id} url={urlT} abrir={abrir} cerrar={handleCerrarModal} />
      )}
    </div>
  );
}
