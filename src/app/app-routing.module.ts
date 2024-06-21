import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertasStockBajoComponent } from './alertas-stock-bajo/alertas-stock-bajo.component';
import { HomeComponent } from './home/home.component';
import { ListaElementosComponent } from './lista-elementos//lista-elementos.component';
import { StockNivelesComponent } from './nivelstock/nivel-stock.component';
import { RegistroInventarioComponent } from './registro-inventario/registro-inventario.component';
import { RegistrosAccionesComponent } from './registros-acciones/registros-acciones.component';
import { SeguimientoInventariosComponent } from './seguimiento-inventarios/seguimiento-inventarios.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReabastecerStockComponent } from './reabastecer-stock/reabastecer-stock.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alertas-stock-bajo', component: AlertasStockBajoComponent },
  { path: 'registro-inventario', component: RegistroInventarioComponent },
  { path: 'seguimiento-inventarios', component: SeguimientoInventariosComponent },
  { path: 'spinner', component:SpinnerComponent},
  { path: 'lista-elementos', component:ListaElementosComponent},
  { path: 'registro-acciones',component:RegistrosAccionesComponent},
  { path: 'stock-niveles', component: StockNivelesComponent }, // Nueva ruta
  { path: 'reabastecer-stock', component: ReabastecerStockComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }