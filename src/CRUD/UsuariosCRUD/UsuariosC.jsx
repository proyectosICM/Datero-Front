import React, { useState } from "react";
import { UsuariosTabla } from "./UsuariosTabla";
import { useParams } from "react-router-dom";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { usuariosEmpresa, usuariosEmpresaEstado } from "../../API/apiurls";

export function UsuariosC() {
  const empresaId = localStorage.getItem("empresaId");
  const [abrir, setAbrir] = useState(false);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const backURL = localStorage.getItem("backURL");
  const urlT = `${usuariosEmpresa}/${empresaId}`;
  const urlH = `${usuariosEmpresaEstado}/${empresaId}/1`;
  const urlD = `${usuariosEmpresaEstado}/${empresaId}/0`;

  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };

  const handleAbrirModal = () => {
    if (!abrir) {
      setAbrir(true);
    } else {
      setAbrir(false);
    }
  };

  const handleCerrarModal = () => {
    if (abrir) {
      setAbrir(false);
    }
  };

  return (
    <div className="container-crud">
      <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder={backURL} />

      {tablaSeleccionada === "Habilitados" && <UsuariosTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal} />}
      {tablaSeleccionada === "Deshabilitados" && <UsuariosTabla url={urlD} abrir={abrir} cerrar={handleCerrarModal} />}
      {tablaSeleccionada === "Todos" && <UsuariosTabla url={urlT} abrir={abrir} cerrar={handleCerrarModal} />}
    </div>
  );
}
