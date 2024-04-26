import React, { useState } from "react";
import { BusesTabla } from "./BusesTabla";

import { BotonesCRUD } from "../../Common/BotonesCRUD";
import { busesEmpresa, busesEmpresaEstado, busesEmpresaEstadoP, busesEmpresaP } from "./../../API/apiurls";

export function BusesC() {
  const empresaId = localStorage.getItem("empresaId");

  const backURL = localStorage.getItem("backURL");

  const [abrir, setAbrir] = useState(false);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const urlT = `${busesEmpresaP}/${empresaId}`;
  const urlH = `${busesEmpresaEstadoP}/${empresaId}/1`;
  const urlD = `${busesEmpresaEstadoP}/${empresaId}/0`;

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

      {tablaSeleccionada === "Habilitados" && <BusesTabla url={urlH} abrir={abrir} cerrar={handleCerrarModal} />}
      {tablaSeleccionada === "Deshabilitados" && <BusesTabla url={urlD} abrir={abrir} cerrar={handleCerrarModal} />}
      {tablaSeleccionada === "Todos" && <BusesTabla url={urlT} abrir={abrir} cerrar={handleCerrarModal} />}
    </div>
  );
}
