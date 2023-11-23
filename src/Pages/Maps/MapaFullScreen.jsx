import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { MapaBuses } from "./MapaBuses";
import { useListarElementos } from "../../Hooks/CRUDHooks";
import { busesEmpresa, busesURL, rpXRuta, rutasURL } from "../../API/apiurls";
import { useNavigate } from "react-router-dom";
import { MapaBusxRuta } from "./Mapa1BusxRuta";
import { MapaBusesYRutas } from "./MapaBusesYRutas";
import axios from "axios";

export function MapaFullSceen() {
  const navigation = useNavigate();

  const idemp = 19;
  // useListarElementos(`${busesEmpresa}/${idemp}`, setBuses);

  const [paraderosShow, setParaderosShow] = useState(false);

  const handleVer = (rutaid) => {
    //setParaderosShow(!paraderosShow);
    setIdRuta(rutaid);
  };

  const [rutas, setRutas] = useState();

  useListarElementos(`${rutasURL}/xempresa/${idemp}`, setRutas);
  const [buses, setBuses] = useState();
  const [idruta, setIdRuta] = useState(1);
  const [paraderos, setParaderos] = useState();
  useListarElementos(`${busesEmpresa}/${idemp}`, setBuses);

  // useListarElementos(`${rpXRuta}/${idruta}`, setParaderos);
  useEffect(() => {
    const fetchParaderos = async () => {
      if (idruta) {
        try {
          const response = await axios.get(`${rpXRuta}/${idruta}`);
          setParaderos(response.data);
          console.log(idruta); // Accede a los datos aquí
        } catch (error) {
          console.error('Error al obtener los paraderos:', error);
        }
      }
    };
  
    fetchParaderos();
  }, [idruta]);

  return (
    <div className="container-crud">
      <Button style={{ width: "100%" }} onClick={() => navigation("/")}>
        Atras
      </Button>
      <MapaBusesYRutas buses={buses} paraderos={paraderos} />
      {/* idruta ? <MapaBusxRuta />: <MapaBuses buses={buses} tipo="bus" /> */}

      <h1>Ruta {idruta}</h1>

      <div className="card-container">
        <Card className="crud-card" style={{ cursor: "pointer" }}>
          <span style={{ fontSize: "20px" }}>Ver todos los buses</span>
          <Button onClick={() => handleVer(null)}>Ver todos los buses</Button>
        </Card>

        {rutas &&
          rutas.map((ruta) => (
            <Card className="crud-card" style={{ cursor: "pointer" }} key={ruta.id}>
              <span style={{ fontSize: "20px" }}>{ruta.nombre}</span>
              <Button onClick={() => handleVer(ruta.id)}>Ver los paraderos</Button>
            </Card>
          ))}
      </div>
    </div>
  );
}
