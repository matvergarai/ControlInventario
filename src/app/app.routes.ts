import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AlertasStockBajoComponent } from './modules/alertas-stock-bajo/alertas-stock-bajo.component';
import { RegistroInventarioComponent } from './modules/registro-inventario/registro-inventario.component';
import { SeguimientoInventariosComponent } from './modules/seguimiento-inventarios/seguimiento-inventarios.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './modules/userprofile/userprofile.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alertas-stock-bajo', component: AlertasStockBajoComponent },
  { path: 'registro-inventario', component: RegistroInventarioComponent },
  { path: 'seguimiento-inventario', component: SeguimientoInventariosComponent },
  { path: 'login',component:LoginComponent},
  { path: 'profile', component: UserprofileComponent}
];