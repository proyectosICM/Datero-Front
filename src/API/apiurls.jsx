// URL base común
const base = "http://localhost:8080"

const baseURL = `${base}/api`;

//CRUD
//Empresas
export const empresasURL = `${baseURL}/empresas`;
export const empresasEstado = `${empresasURL}/xestado`;

//Buses
export const busesURL = `${baseURL}/buses`;
export const busesEmpresa = `${busesURL}/xempresa`;
export const busesEmpresaEstado = `${busesURL}/xempresaAndEstado`;
export const busesPosURL = `${baseURL}/buses/pos`;

//Rutas
export const rutasURL = `${baseURL}/rutas`;
export const rutasEmpresa = `${rutasURL}/xempresa`;
export const rutasEmpresaEstado = `${rutasURL}/xempresaAndEstado`;

//Distritos
export const distritosURL = `${baseURL}/distritos`;
export const distritosEstado = `${distritosURL}/xestado`;

//Distritos
export const rolesURL = `${baseURL}/roles`;
export const rolesEstado = `${rolesURL}/xestado`;

//Paraderos
export const paraderosURL = `${baseURL}/paraderos`;
export const paraderosEstado = `${paraderosURL}/xestado`;
export const paraderosEmpresaEstado = `${paraderosURL}/xempresaAndEstado`;

//Usuarios
export const usuariosURL = `${baseURL}/usuarios`;
export const usuariosEmpresa = `${usuariosURL}/xempresa`;
export const usuariosEmpresaEstado = `${usuariosURL}/xempresaAndEstado`

//RP Ruta por Paraderos
export const rpURL = `${baseURL}/rp`;
export const rpXRuta = `${rpURL}/xruta`;

//Boleto
// http://localhost:8080/api/boletos/xempresaAndRuta/19/2
export const boleto = `${baseURL}/boletos`;
export const boletoxruta = `${boleto}/xempresaAndRuta/`

//Conteo de Boletos
export const conteob = `${baseURL}/conteoB`;
export const conteobxbus = `${conteob}/conteoPorBusYFechaActual/`

//Registro ruta
export const registroruta = `${baseURL}/registroRuta`
export const registrorutaxbus = `${registroruta}/registrosPorBusYFechaActual/`

//Historial
export const historial = `http://localhost:8080/api/conteoB/last-7-days-ordered`