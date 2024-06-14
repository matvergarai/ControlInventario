import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { AlertasStockBajoComponent } from './alertas-stock-bajo/alertas-stock-bajo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { EditarPiezaModalComponent } from './editar-pieza-modal/editar-pieza-modal/editar-pieza-modal.component';
import { ListaElementosComponent } from './lista-elementos/lista-elementos.component';
import { LoadingService } from './loading.service';
import { StockNivelesComponent } from './nivelstock/nivel-stock.component'; // Asegúrate de importar el componente
import { RegistroInventarioComponent } from './registro-inventario/registro-inventario.component';
import { RegistrosAccionesComponent } from './registros-acciones/registros-acciones.component';
import { SeguimientoInventariosComponent } from './seguimiento-inventarios/seguimiento-inventarios.component';
import { SpinnerComponent } from './spinner/spinner.component';
// Definición de las rutas
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alertas-stock-bajo', component: AlertasStockBajoComponent },
  { path: 'registro-inventario', component: RegistroInventarioComponent },
  { path: 'seguimiento-inventarios', component: SeguimientoInventariosComponent },
  // Puedes agregar más rutas aquí según sea necesario
  // Por ejemplo:
  // { path: 'otra-ruta', component: OtroComponente },
  // { path: '**', redirectTo: '' } // Redirecciona a la página de inicio para rutas no encontradas
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertasStockBajoComponent,
    RegistroInventarioComponent,
    SeguimientoInventariosComponent,
    SpinnerComponent,
    EditarPiezaModalComponent,
    ListaElementosComponent,
    RegistrosAccionesComponent,
    StockNivelesComponent 
    
    //NivelesStockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule { }