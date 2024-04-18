import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlertasStockBajoComponent } from './alertas-stock-bajo/alertas-stock-bajo.component';
import { RegistroInventarioComponent } from './registro-inventario/registro-inventario.component';
import { SeguimientoInventariosComponent } from './seguimiento-inventarios/seguimiento-inventarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alertas-stock-bajo', component: AlertasStockBajoComponent },
  { path: 'registro-inventario', component: RegistroInventarioComponent },
  { path: 'seguimiento-inventario', component: SeguimientoInventariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }