import React, { useState } from "react";
import { RutasTabla } from "./RutasTabla";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { rutasEmpresa, rutasEmpresaEstado } from "../../API/apiurls";

export function RutasC() {
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
  const empresaId = localStorage.getItem("empresaId");
  
  const urlT = `${rutasEmpresa}/${empresaId}`;
  const urlH = `${rutasEmpresaEstado}/${empresaId}/1`;
  const urlD = `${rutasEmpresaEstado}/${empresaId}/0`;

  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };

  const [abrir, setAbrir] = useState(false);

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

  const backURL = localStorage.getItem("backURL");
  
  return (
    <div className="container-crud">
      <div className="set-botones">
        <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder={backURL} />
      </div>
      {tablaSeleccionada === "Habilitados" && <RutasTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal} />}
      {tablaSeleccionada === "Deshabilitados" && <RutasTabla url={urlD} abrir={abrir} cerrar={handleCerrarModal} />}
      {tablaSeleccionada === "Todos" && <RutasTabla url={urlT} abrir={abrir} cerrar={handleCerrarModal} />}
    </div>
  );
}
