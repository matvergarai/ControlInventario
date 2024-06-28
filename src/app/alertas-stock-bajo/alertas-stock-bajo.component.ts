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
    const nivelAceptable = 10; // Define el nivel de stock aceptable
    const cantidadNecesaria = nivelAceptable - articulo.cantidad;

    if (cantidadNecesaria > 0) {
      const ordenCompra = {
        idPieza: articulo._id,
        cantidadRequerida: cantidadNecesaria
      };

      this.inventarioService.generarOrdenCompra(ordenCompra).subscribe({
        next: (result) => {
          console.log('Orden de reposición generada con éxito para', articulo.nombre);
          this.alertasStockBajo = this.alertasStockBajo.filter(p => p._id !== articulo._id);
        },
        error: (err) => {
          console.error('Error al generar la orden de reposición para', articulo.nombre, ':', err.message);
          console.error('Detalles del error:', err);
        }
      });
    } else {
      alert('El stock actual ya es suficiente.');
    }
  }
}