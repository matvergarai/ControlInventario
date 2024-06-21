import { Component } from '@angular/core';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-reabastecer-stock',
  templateUrl: './reabastecer-stock.component.html',
  styleUrls: ['./reabastecer-stock.component.scss']
})
export class ReabastecerStockComponent {
  cantidad: number = 0;
  almacenSeleccionado: string = '';

  constructor(private inventarioService: InventarioService) {}

  onSubmit() {
    if (this.cantidad > 0 && this.almacenSeleccionado) {
      this.inventarioService.reabastecerStock(this.almacenSeleccionado, this.cantidad).subscribe({
        next: (response) => console.log('Stock reabastecido:', response),
        error: (error) => console.error('Error al reabastecer stock:', error)
      });
    }
  }
}