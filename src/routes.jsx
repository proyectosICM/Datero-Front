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

import { ListadoVehiculos } from "./Common/ListadoVehiculos";
import { Login } from "./Pages/Login/Login";
import { Inicio } from "./Pages/Inicio/Inicio";
import { MenuAdministrador } from "./Pages/Administrar/MenuAdministrador";

import { MapaDePrueba } from "./Common/MapaDePrueba";
import { MenuBuses } from "./Pages/Buses/MenuBuses";
import { PanelBus } from "./Pages/Buses/PanelBus";
import { PanelHistorialBus } from "./Pages/Buses/HistorialBus/PanelHistorialBus";
import { Tabla7Dias } from "./Pages/Buses/HistorialBus/Tabla7Dias";

import { MapaFullSceen } from "./Pages/Maps/MapaFullScreen";
import { MapaBuses } from "./Pages/Maps/MapaBuses";
import { RutasMapa } from "./Pages/Maps/RutasMapa";
import { MapaOL } from "./Pages/Maps/mapaOL";
import { MapaOL2 } from "./Pages/Maps/mapaOL2";


export const routes = [

  // Inicio

  // Panel Rutas
  { path: "/rutas", component: <RutasC /> },
  { path: "/paraderos-de-ruta", component: <ParaderoXRutaTabla /> },
  { path: "/mapa-de-ruta", component: <RutasMapa /> },

  // Panel Buses
  { path: "/buses", component: <MenuBuses /> },
  { path: "/panel-bus", component: <PanelBus /> },
  { path: "/historial-bus", component: <PanelHistorialBus />},
  { path: "/historial-detalle", component: <Tabla7Dias />},

  // Menu Administrador
  { path: "/menu-administrador", component: <MenuAdministrador /> },  
  { path: "/buses-CRUD", component: <BusesC /> },
  { path: "/paraderos-CRUD", component: <ParaderosC /> },
  { path: "/trabajadores-CRUD", component: <UsuariosC /> },
  { path: "/paradero-en-mapa", component: <ParaderosMapa /> },

  // Descartadas
  { path: "/rutasxemp/:id", component: <RutasC /> },
  { path: "/buses/:id", component: <MenuBuses /> },
  { path: "/panel-bus", component: <PanelBus /> },
  { path: "/historial-bus/:id", component: <PanelHistorialBus />},
  { path: "/historial/:id/:dias", component: <Tabla7Dias />},
  { path: "/menu-administrador", component: <MenuAdministrador /> },
  { path: "/busesxemp/:id", component: <BusesC /> },
  { path: "/paraderosCRUD", component: <ParaderosC /> },
  { path: "/usuariosxemp/:id", component: <UsuariosC /> },
  { path: "/paraderoxmap/:nombre/:longitud/:latitud", component: <ParaderosMapa /> },

  //Maps 
  { path: "/mapa-buses", component: <MapaBuses />},
  { path: "/map-fullScreen",  component: <MapaFullSceen />},

  { path: "/mapa-prueba", component: <MapaOL /> },
  { path: "/mapa-prueba2", component: <MapaOL2/> },

  //Pages
  { path: "/", component: <Inicio /> },

  { path: "/mapa", component: <MapaDePrueba /> },

 

  //CRUD

  { path: "/CRUD", component: <MenuCRUD /> },
  { path: "/menuEmpresas/:ruta", component: <MenuEmpresas /> },

  //Empresa
  { path: "/empresasCRUD", component: <EmpresasC /> },



  { path: "/distritosCRUD", component: <DistritoC /> },

 

  { path: "/rolesCRUD", component: <RolesC /> },


  { path: "/listadoVehiculos", component: <ListadoVehiculos /> },
  { path: "/login", component: <Login /> },




];
