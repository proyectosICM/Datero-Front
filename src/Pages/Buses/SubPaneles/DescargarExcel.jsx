import React from "react";
import FileSaver from "file-saver";
import ExcelJS from "exceljs";
import { Button } from "react-bootstrap";

export function DescargarExcel() {

  const descargarExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("MiHojaDeCalculo");

    // Agregar encabezados
    worksheet.addRow([
      "Dia",
      "Placa",
      "Tiempo de ruta",
      "",
      "Boletos total",
      "",
      "Zonal",
      "",
      "Interurbano",
      "",
      "Urbano",
      "",
      "Directo",
      "",
      "Personalizado",
    ]);

    // Unir celdas según las instrucciones
    worksheet.mergeCells("C1:D1");
    worksheet.mergeCells("E1:F1");
    worksheet.mergeCells("G1:H1");
    worksheet.mergeCells("I1:J1");
    worksheet.mergeCells("K1:L1");
    worksheet.mergeCells("M1:N1");
    worksheet.mergeCells("O1:P1");

    // Establecer alineación centrada para todas las celdas
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center" };
      });
    });

    // Agregar bordes a todas las celdas desde A1 hasta P20
    for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= 16; j++) {
        worksheet.getCell(i, j).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    }

    // Crea un Blob (objeto binario) a partir del archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Descarga el archivo usando FileSaver.js
      FileSaver.saveAs(blob, "miarchivo.xlsx");
    });
  };

  return (
    <>
      <Button className="boton-atras" variant="success" onClick={descargarExcel}>
        Descargar nuevo Excel
      </Button>
    </>
  );
}
