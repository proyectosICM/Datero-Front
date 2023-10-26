import { BusesC } from "./CRUD/BusesCRUD/BusesC";
import { EmpresasC } from "./CRUD/EmpresasCRUD/EmpresasC";
import { MenuCRUD } from "./CRUD/MenuCRUD";
import { MenuEmpresas } from "./CRUD/MenuEmpresas";
import { RutasC } from "./CRUD/RutasCRUD/RutasC";
import { Inicio } from "./Common/Inicio";
import { MapaDePrueba } from "./Common/MapaDePrueba";
import { ParaderosC } from './CRUD/ParaderosCRUD/ParaderosC';
import { DistritoC } from "./CRUD/DistritosCRUD/DistritosC";
import { RolesC } from './CRUD/RolesCRUD/RolesC';
import { UsuariosC } from "./CRUD/UsuariosCRUD/UsuariosC";

export const routes = [
  { path: "/", component: <Inicio /> },
  { path: "/mapa", component: <MapaDePrueba /> },

  //CRUD

  { path: "/CRUD", component: <MenuCRUD /> },
  { path: "/menuEmpresas/:ruta", component: <MenuEmpresas /> },
  //Empresa
  { path: "/empresasCRUD", component: <EmpresasC /> },
  { path: "/busesxemp/:id", component: <BusesC /> },
  { path: "/rutasxemp/:id", component: <RutasC />},
  { path: "/usuariosxemp/:id", component: <UsuariosC />},
  { path: "/distritosCRUD", component: <DistritoC />},
  { path: "/paraderosCRUD", component: <ParaderosC />},
  { path: '/rolesCRUD', component: <RolesC /> },
];
