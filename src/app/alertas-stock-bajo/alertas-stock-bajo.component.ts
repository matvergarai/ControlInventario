import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { Articulo } from '../model/articulo.model';

@Component({
  selector: 'app-alertas-stock-bajo',
  templateUrl: './alertas-stock-bajo.component.html',
  styleUrls: ['./alertas-stock-bajo.component.scss']
})
export class AlertasStockBajoComponent implements OnInit {
  alertasStockBajo: Articulo[] = [];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.inventarioService.obtenerPiezasConBajoStock().subscribe(stock => {
      this.alertasStockBajo = stock;
      console.log('Piezas con bajo stock:', this.alertasStockBajo); // Verificar los datos
    });
  }

  generarOrdenReposicion(articulo: Articulo): void {
    const ordenCompra = {
      id: articulo.id, // Asegúrate de enviar el id correcto
      nombre: articulo.nombre,
      cantidad: articulo.cantidad,
      nivelMinimo: articulo.nivelMinimo,
      ubicacion: articulo.ubicacion,
    };

    this.inventarioService.generarOrdenCompra(ordenCompra).subscribe({
      next: (result) => {
        console.log('Orden de reposición generada con éxito para', articulo.nombre);
      },
      error: (err) => {
        console.error('Error al generar la orden de reposición para', articulo.nombre, err);
      }
    });
  }
}
