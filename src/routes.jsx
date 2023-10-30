import { BusesC } from "./CRUD/BusesCRUD/BusesC";
import { EmpresasC } from "./CRUD/EmpresasCRUD/EmpresasC";
import { MenuCRUD } from "./CRUD/MenuCRUD";
import { MenuEmpresas } from "./CRUD/MenuEmpresas";
import { RutasC } from "./CRUD/RutasCRUD/RutasC";
import { MapaDePrueba } from "./Common/MapaDePrueba";
import { ParaderosC } from './CRUD/ParaderosCRUD/ParaderosC';
import { DistritoC } from "./CRUD/DistritosCRUD/DistritosC";
import { RolesC } from './CRUD/RolesCRUD/RolesC';
import { UsuariosC } from "./CRUD/UsuariosCRUD/UsuariosC";
import { ParaderosMapa } from "./CRUD/ParaderosCRUD/ParaderosMapa";
import { ParaderoXRutaTabla } from "./CRUD/ParaderoxRuta/ParaderoXRutaTabla";
import { RutasMapa } from "./CRUD/RutasCRUD/RutasMapa";
import { ListadoVehiculos } from "./Common/ListadoVehiculos";
import { Login } from "./Login/Login";
import { Inicio } from "./Inicio/Inicio";

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
  { path: '/paraderoxmap/:nombre/:longitud/:latitud', component: <ParaderosMapa /> },
  { path: '/paraderoxruta/:ruta', component: <ParaderoXRutaTabla /> },
  { path: '/rolesCRUD', component: <RolesC /> },

  { path: '/rutasMapa', component: <RutasMapa /> },
  { path: '/listadoVehiculos', component: <ListadoVehiculos /> },
  { path: '/login', component: <Login /> },
];
