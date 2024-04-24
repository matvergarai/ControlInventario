//core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule aquí
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule aquí
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
//componentes 
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { AlertasStockBajoComponent } from './modules/alertas-stock-bajo/alertas-stock-bajo.component';
import { RegistroInventarioComponent } from './modules/registro-inventario/registro-inventario.component';
import { SeguimientoInventariosComponent } from './modules/seguimiento-inventarios/seguimiento-inventarios.component';
import { UserprofileComponent } from './modules/userprofile/userprofile.component';
import { LoginComponent } from './login/login.component';
//materiales
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule }from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertasStockBajoComponent,
    RegistroInventarioComponent,
    SeguimientoInventariosComponent,
    LoginComponent,
    UserprofileComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Agrega RouterModule aquí
    BrowserAnimationsModule,// Agrega BrowserAnimationsModule aquí
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent, HomeComponent,AlertasStockBajoComponent,RegistroInventarioComponent,SeguimientoInventariosComponent,LoginComponent,UserprofileComponent]
})
export class AppModule { }