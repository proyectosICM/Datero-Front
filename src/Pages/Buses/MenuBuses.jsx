import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardBuses } from "./CardBuses";
import { busesEmpresaEstado, busesEmpresaEstadoP } from "../../API/apiurls";
import { ListPaginatedData, useFetchData, useListarElementos, useListarElementosPaginados } from "../../Hooks/CRUDHooks";
import { Button } from "react-bootstrap";
import "./BusesStyles.css";
import { PaginacionUtils } from "../../Hooks/paginationUtils";

export function MenuBuses() {
  const [pageNumber, setPageNumber] = useState(0);
  const navigation = useNavigate();
  const empresaId = localStorage.getItem("empresaId");

  const { datos, totalPages, currentPage, setCurrentPage, fetchData } = useFetchData(
    `${busesEmpresaEstadoP}/${empresaId}/1`,
    pageNumber
  );

  useEffect(() => {
    fetchData(pageNumber);
    console.log("si")
  }, []);

  return (
    <div className="container-crud">
      <div className="card-container">
        <Button className="boton-atras" onClick={() => navigation(`/`)}>
          Atras
        </Button>

        {datos && datos.map((dato) => <CardBuses key={dato.id} dato={dato} />)}
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
