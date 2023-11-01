import { BusesC } from "./CRUD/BusesCRUD/BusesC";
import { EmpresasC } from "./CRUD/EmpresasCRUD/EmpresasC";
import { MenuCRUD } from "./CRUD/MenuCRUD";
import { MenuEmpresas } from "./CRUD/MenuEmpresas";
import { RutasC } from "./CRUD/RutasCRUD/RutasC";

import { ParaderosC } from "./CRUD/ParaderosCRUD/ParaderosC";
import { DistritoC } from "./CRUD/DistritosCRUD/DistritosC";
import { RolesC } from "./CRUD/RolesCRUD/RolesC";
import { UsuariosC } from "./CRUD/UsuariosCRUD/UsuariosC";
import { ParaderosMapa } from "./CRUD/ParaderosCRUD/ParaderosMapa";
import { ParaderoXRutaTabla } from "./CRUD/ParaderoxRuta/ParaderoXRutaTabla";
import { RutasMapa } from "./CRUD/RutasCRUD/RutasMapa";
import { ListadoVehiculos } from "./Common/ListadoVehiculos";
import { Login } from "./Pages/Login/Login";
import { Inicio } from "./Pages/Inicio/Inicio";
import { MenuAdministrador } from "./Pages/Administrar/MenuAdministrador";

import { MapaDePrueba } from "./Common/MapaDePrueba";
import { MenuBuses } from "./Pages/Buses/MenuBuses";
import { PanelBus } from "./Pages/Buses/PanelBus";

export const routes = [
  //Pages
  { path: "/", component: <Inicio /> },
  { path: "/buses/:id", component: <MenuBuses /> },
  { path: "/mapa", component: <MapaDePrueba /> },
  { path: "/menu-administrador", component: <MenuAdministrador /> },
  { path: "/panel-bus", component: <PanelBus /> },

  //CRUD

  { path: "/CRUD", component: <MenuCRUD /> },
  { path: "/menuEmpresas/:ruta", component: <MenuEmpresas /> },
  //Empresa
  { path: "/empresasCRUD", component: <EmpresasC /> },
  { path: "/busesxemp/:id", component: <BusesC /> },
  { path: "/rutasxemp/:id", component: <RutasC /> },
  { path: "/usuariosxemp/:id", component: <UsuariosC /> },
  { path: "/distritosCRUD", component: <DistritoC /> },
  { path: "/paraderosCRUD", component: <ParaderosC /> },
  { path: "/paraderoxmap/:nombre/:longitud/:latitud", component: <ParaderosMapa /> },
  { path: "/paraderoxruta/:ruta", component: <ParaderoXRutaTabla /> },
  { path: "/rolesCRUD", component: <RolesC /> },

  { path: "/rutasMapa/:id", component: <RutasMapa /> },
  { path: "/listadoVehiculos", component: <ListadoVehiculos /> },
  { path: "/login", component: <Login /> },

  
];
