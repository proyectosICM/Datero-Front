import React, { useState } from "react";
import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { empresasURL, empresasEstado } from "../../API/apiurls";
import { EmpresasTabla } from "./EmpresasTabla";
 
export function EmpresasC() {
  const [mostrartabla, setMostrarTabla] = useState(true);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
  const [abrir, setAbrir] = useState(false);

  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
    setMostrarTabla(true);
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
      <div className="set-botones">
        <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/CRUD" />
      </div>

      {mostrartabla && (
        <>
          {tablaSeleccionada === "Habilitados" && <EmpresasTabla url={`${empresasEstado}/1`} abrir={abrir} cerrar={handleCerrarModal} />}
          {tablaSeleccionada === "Deshabilitados" && <EmpresasTabla url={`${empresasEstado}/0`} abrir={abrir} cerrar={handleCerrarModal} />}
          {tablaSeleccionada === "Todos" && <EmpresasTabla url={empresasURL} abrir={abrir} cerrar={handleCerrarModal} />}
        </>
      )}
    </div>
  );
}
