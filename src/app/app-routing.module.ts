import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertasStockBajoComponent } from './alertas-stock-bajo/alertas-stock-bajo.component';
import { HomeComponent } from './home/home.component';
import { RegistroInventarioComponent } from './registro-inventario/registro-inventario.component';
import { SeguimientoInventariosComponent } from './seguimiento-inventarios/seguimiento-inventarios.component';
import { SpinnerComponent } from './spinner/spinner.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alertas-stock-bajo', component: AlertasStockBajoComponent },
  { path: 'registro-inventario', component: RegistroInventarioComponent },
  { path: 'seguimiento-inventarios', component: SeguimientoInventariosComponent },
  { path: 'spinner', component:SpinnerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }