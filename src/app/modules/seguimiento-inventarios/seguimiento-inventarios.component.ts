import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../service/inventario/inventario.service';

@Component({
  selector: 'app-seguimiento-inventarios',
  templateUrl: './seguimiento-inventarios.component.html',
  styleUrls: ['./seguimiento-inventarios.component.scss'] // Ajusta la extensión del archivo aquí
})
export class SeguimientoInventariosComponent implements OnInit {
  historialMovimientos: any[] = [];
  nuevoMovimiento: any = {}; // Objeto para almacenar los datos del nuevo movimiento

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.obtenerHistorialMovimientos();
  }

  obtenerHistorialMovimientos(): void {
    this.inventarioService.obtenerHistorialMovimientos().subscribe(movimientos => {
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
}