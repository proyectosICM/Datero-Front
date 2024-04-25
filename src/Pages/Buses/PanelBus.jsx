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
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { busesURL } from "../../API/apiurls";

export function PanelBus() {
  const navigation = useNavigate();

  const busId = localStorage.getItem("busId");
  const rutaId = localStorage.getItem("rutaId");
  // const [downloadStatus, setDownloadStatus] = useState(null);

  const [bus, setBus] = useState();

  useListarElementos(`${busesURL}/${busId}`, setBus);

  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/buses`)}>
        Atras
      </Button>
      <PanelMapa idbus={busId} idruta={rutaId} />
      <PanelBoletos idbus={busId} />
      <PanelRegistros idbus={busId} />
      <PanelExtra idbus={busId} />
      {/*   <DescargarExcel /> */}
    </div>
  );
}
