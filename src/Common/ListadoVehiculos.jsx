import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaMapMarkerAlt, FaTruck, FaUser, FaMapSigns } from "react-icons/fa";
import { BsBuildingsFill, BsBusFront } from "react-icons/bs";
import { TfiCreditCard } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { busesURL } from "../API/apiurls";


export function ListadoVehiculos() {
  const [datos, setDatos] = useState([]);

  const ListDatos = useCallback(async () => {
    const results = await axios.get(`${busesURL}`);
    setDatos(results.data);
  }, []);

  useEffect(() => {
    ListDatos();
  }, [ListDatos]);

  return (
    <div className="container-registros">
      <h1><BsBusFront /> Listado de Vehículos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><FaMapSigns />RUTA</th>
            <th><TfiCreditCard /> PLACA</th>
            <th><FaTruck /> MODELO</th>
            <th><FaUser className="icon" /> CONDUCTOR</th>
            <th><BsBuildingsFill className="icon" /> EMPRESA</th>
            <th><FaMapMarkerAlt className="icon" /> LATITUD</th>
            <th><FaMapMarkerAlt className="icon" /> LONGUITUD</th>
            <th><FaMapMarkerAlt className="icon" /> PARADERO MÁS PRÓXIMO</th>
            <th><FaMapMarkerAlt className="icon" /> VER UBICACION EN EL MAPA</th>
          </tr>
        </thead>
        <tbody>
          {datos && datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.rutasModel.nombre}</td>
              <td>{dato.placa}</td>
              <td>{dato.modelo}</td>
              <td>
                {dato.usuariosModel.nombre} {dato.usuariosModel.apellido}
              </td>
              <td>
                {dato.empresasModel.nombre}
              </td>
              <td>
                {dato.latitud}
              </td>
              <td>
                {dato.longitud}
              </td>
              <td>
                <FaMapMarkerAlt className="icon" />
                {/* dato.paradero_mas_proximo */}
              </td>
              <td>
                <Button>
                  <Link to={`/mapaBus/${dato.id}/${dato.rutasModel.id}`} className="linkes">
                    Ver
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
