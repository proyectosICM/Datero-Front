export function requestDataRuta(ruta, empresaId) {
  return {
    nombre: ruta.nombre,
    estado: ruta.estado,
    empresasModel: {
      id: empresaId,
    },
  };
}

export function requestDataUsuario(usuario, empresaId) {
  return {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    dni: usuario.dni,
    username: usuario.username,
    password: usuario.password,
    empresasModel: {
      id: empresaId,
    },
    rolesModel: {
      id: usuario.rolesModel,
    },
    estado: usuario.estado,
  };
}

export function requestDataBus(bus, empresaId) {
  return {
    modelo: bus.modelo,
    placa: bus.placa,
    estado: bus.estado,
    usuariosModel: {
      id: bus.usuariosModel,
    },
    empresasModel: {
      id: empresaId,
    },
    rutasModel: {
      id: bus.rutasModel,
    },
  };
}

export function requestDataParadero(paradero) {
  return {
    nombre: paradero.nombre,
    estado: paradero.estado,
    distritosModel: {
      id: paradero.distritosModel,
    },
    longitud: paradero.longitud,
    latitud: paradero.latitud,
  };
}
