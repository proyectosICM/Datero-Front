import axios from "axios";
import { useCallback, useEffect } from "react";

export function useListarElementos(url, setDatos) {
  const ListarDatos = useCallback(async () => {
    const results = await axios.get(url);
    setDatos(results.data);
  }, [url, setDatos]);

  useEffect(() => {
    const intervalId = setInterval(ListarDatos, 1000);
    ListarDatos();
    return () => {
      clearInterval(intervalId);
    };
  }, []);
}

export function agregarElemento(url, requestData, closeModal) {
  axios
    .post(url, requestData)
    .then(() => {
      closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editarElemento(url, requestData, closeModal) {
  axios
    .put(url, requestData)
    .then(() => {
      closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function cambiarEstadoElemento(url, id, est) {
  const nurl = `${url}/${id}`;
  axios.get(nurl).then((response) => {
    const elemento = response.data;
    if (elemento[est]) {
      elemento[est] = false;
    } else if (!elemento[est]) {
      elemento[est] = true;
    }
    axios.put(nurl, elemento).then(() => {});
  });
}

export function MoverBus(url, id, lat, lon, pla, ListarDatos) {
  const nurl = `${url}/${id}`;
  axios.get(nurl).then((response) => {
    const autobus = response.data;

    const newLat = autobus[lat] + 0.0002003;
    const newLon = autobus[lon] + 0.0002003;

    autobus[lat] = newLat;
    autobus[lon] = newLon;

    autobus[pla] = "A222A";
    //const posedit = `${busesPosURL}/${id}`;
    let posedit;
    axios.put(posedit, autobus).then(() => {
      ListarDatos();
    });
  });
}
