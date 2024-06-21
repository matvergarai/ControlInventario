import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-seguimiento-inventarios',
  templateUrl: './seguimiento-inventarios.component.html',
  styleUrls: ['./seguimiento-inventarios.component.scss'] // Ajusta la extensión del archivo aquí
})
export class SeguimientoInventariosComponent implements OnInit {
  historialMovimientos: any[] = [];
  nuevoMovimiento: any = {}; // Objeto para almacenar los datos del nuevo movimiento
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private inventarioService: InventarioService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.obtenerHistorialMovimientos();

    this.loadingService.show();
      setTimeout(() => {
        this.loadingService.hide();
      }, 2000);
  }

  obtenerHistorialMovimientos(): void {
    this.inventarioService.obtenerHistorialMovimientos(this.fechaInicio, this.fechaFin).subscribe(movimientos => {
      this.historialMovimientos = movimientos;
    });
  }

  registrarMovimiento(): void {
    // Lógica para registrar el nuevo movimiento de inventario
    this.inventarioService.registrarMovimiento(this.nuevoMovimiento).subscribe(response => {
      console.log('Movimiento registrado exitosamente:', response);
      // Limpiar el formulario después de registrar el movimiento
      this.nuevoMovimiento = {};
      // Actualizar el historial de movimientos
      this.obtenerHistorialMovimientos();
    });
  }
  
  exportarReporte(formato: string): void {
    this.inventarioService.exportarReporte(formato, this.historialMovimientos).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `reporte_movimientos.${formato}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}