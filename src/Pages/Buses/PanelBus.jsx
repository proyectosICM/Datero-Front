import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PanelBoletos } from "./SubPaneles/PanelBoletos";
import { PanelExtra } from "./SubPaneles/PanelExtra";
import { PanelRegistros } from "./SubPaneles/PanelRegistros";
import { PanelMapa } from "./SubPaneles/PanelMapa";
import FileSaver from "file-saver";
import ExcelJS from "exceljs";
import { DescargarExcel } from "./SubPaneles/DescargarExcel";

export function PanelBus() {
  const navigation = useNavigate();
  const { id } = useParams();

  const [downloadStatus, setDownloadStatus] = useState(null);

 
  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/buses/19`)}>
        Atras
      </Button>
      <PanelMapa idbus = {id} />
      <PanelBoletos idbus = {id} />
      <PanelRegistros idbus = {id} />
      <PanelExtra  idbus = {id} />
  { /*   <DescargarExcel /> */ }
    </div>
  );
}
