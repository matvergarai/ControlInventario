import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-registros-acciones',
  templateUrl: './registros-acciones.component.html',
  styleUrls: ['./registros-acciones.component.scss']
})
export class RegistrosAccionesComponent implements OnInit {
  registros: any[] = [];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.obtenerRegistrosAcciones();
  }

  obtenerRegistrosAcciones(): void {
    this.inventarioService.obtenerRegistrosAcciones().subscribe(
      registros => {
        console.log('Registros recibidos:', registros); // Log para verificar los datos recibidos
        this.registros = registros;
      },
      error => {
        console.error('Error al obtener los registros de acciones:', error);
      }
    );
  }
}