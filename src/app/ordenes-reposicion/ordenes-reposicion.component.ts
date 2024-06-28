import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InventarioService } from '../inventario.service';
import { Articulo } from '../model/articulo.model';

@Component({
  selector: 'app-ordenes-reposicion',
  templateUrl: './ordenes-reposicion.component.html',
  styleUrls: ['./ordenes-reposicion.component.scss']
})
export class OrdenesReposicionComponent implements OnInit {
  ordenesReposicion: Articulo[] = [];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    // Emitir valores cada 10 segundos y actualizar la lista de órdenes
    interval(1000).pipe(
      switchMap(() => this.inventarioService.obtenerOrdenesReposicion())
    ).subscribe(ordenes => {
      this.ordenesReposicion = ordenes;
    });
  }

  eliminarTodasOrdenes(): void {
    this.inventarioService.eliminarOrdenesReposicion().subscribe({
      next: (result) => {
        console.log('Todas las órdenes de reposición han sido eliminadas');
        this.ordenesReposicion = [];
      },
      error: (err) => {
        console.error('Error al eliminar las órdenes de reposición:', err.message);
        console.error('Detalles del error:', err);
      }
    });
  }
}