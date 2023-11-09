import React from "react";

export function Tabla7Dias() {
    const navigation = useNavigate();

    const [datos, setDatos] = useState([]);
  
    useListarElementos("http://localhost:8080/api/conteoB/last-7-days-ordered", setDatos);
  
    // Función para agrupar datos por día
    const agruparPorDia = (datos) => {
      const grupos = {};
      datos.forEach((dato) => {
        const diaKey = dato.dia.join("-");
        if (!grupos[diaKey]) {
          grupos[diaKey] = [];
        }
        grupos[diaKey].push(dato);
      });
      return grupos;
    };
  
    const datosAgrupados = agruparPorDia(datos);
  
    const descargarExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Historial");
    
      // Agregar encabezados a la hoja de cálculo
      const encabezados = ["Día"];
      const servicios = datosAgrupados[Object.keys(datosAgrupados)[0]][0].servicios; // Tomamos servicios de un día cualquiera
      servicios.forEach((servicio) => {
        //encabezados.push(servicio.nombre, "Conteo");
      });
      //worksheet.addRow(encabezados);
    
      // Agregar datos
      Object.keys(datosAgrupados).forEach((diaKey) => {
        const fila = [diaKey];
        datosAgrupados[diaKey].forEach((dato) => {
          dato.servicios.forEach((servicio) => {
            fila.push(servicio.nombre, servicio.conteo);
          });
        });
        worksheet.addRow(fila);
      });
    
      // Agregar bordes a las celdas A1 a K3
      for (let col = 1; col <= 11; col++) {
        for (let row = 1; row <= 30; row++) {
          const cell = worksheet.getCell(row, col);
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }
      }
    
      // Crear un archivo blob y descargarlo
      const blob = await workbook.xlsx.writeBuffer();
      const blobObject = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blobObject);
      const a = document.createElement("a");
      a.href = url;
      a.download = "historial.xlsx";
      a.click();
    };
    
  return (
    <div className="container-crud">
      <Button className="boton-atras" onClick={() => navigation(`/panel-bus`)}>
        Atras
      </Button>
      <h1>Historial últimos 7 días</h1>
      <Table striped bordered hover>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {Object.keys(datosAgrupados).map((diaKey, index) => (
            <tr key={index}>
              <td>{diaKey}</td>
              {datosAgrupados[diaKey].map((dato, subIndex) => (
                <React.Fragment key={subIndex}>
                  <td>{dato.servicios[0].nombre}</td>
                  <td>{dato.servicios[0].conteo}</td>
                  {/* Agrega aquí las columnas para otros servicios si es necesario */}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={descargarExcel}>Descargar</Button>
      </div>
  );
}
