import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-seguimiento-inventarios',
  templateUrl: './seguimiento-inventarios.component.html',
  styleUrls: ['./seguimiento-inventarios.component.scss']
})
export class SeguimientoInventariosComponent implements OnInit {
  historialMovimientos: any[] = [];
  nuevoMovimiento: any = {}; // Objeto para almacenar los datos del nuevo movimiento
  piezas: any[] = []; // Lista de piezas disponibles
  piezasFiltradas: any[] = []; // Lista de piezas filtradas para el buscador
  piezaBusqueda: string = ''; // Término de búsqueda para las piezas
  fechaInicio: string = '';
  fechaFin: string = '';
  registroExitoso: boolean = false;
  errorRegistro: string = '';
  enviandoRegistro: boolean = false;

  constructor(private inventarioService: InventarioService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.obtenerHistorialMovimientos();
    this.obtenerPiezas();

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

  obtenerPiezas(): void {
    this.inventarioService.obtenerPiezas().subscribe(piezas => {
      this.piezas = piezas;
    });
  }

  buscarPiezas(): void {
    this.piezasFiltradas = this.piezas.filter(pieza =>
      pieza.nombre.toLowerCase().includes(this.piezaBusqueda.toLowerCase())
    );
  }

  seleccionarPieza(pieza: any): void {
    this.nuevoMovimiento.pieza = pieza;
    this.piezaBusqueda = pieza.nombre;
    this.piezasFiltradas = [];
  }

  registrarMovimiento(): void {
    if (this.nuevoMovimiento && !this.enviandoRegistro) {
      this.enviandoRegistro = true;
      this.inventarioService.registrarMovimiento(this.nuevoMovimiento).subscribe(
        response => {
          console.log('Movimiento registrado exitosamente:', response);
          this.historialMovimientos.push(response);
          this.nuevoMovimiento = {}; // Limpiar el formulario después de registrar el movimiento
          this.registroExitoso = true;
          this.errorRegistro = '';
        },
        error => {
          this.registroExitoso = false;
          this.errorRegistro = 'Ocurrió un error al registrar el movimiento. Por favor, inténtelo de nuevo más tarde.';
        },
        () => {
          this.enviandoRegistro = false;
        }
      );
    }
  }

  exportarReporte(formato: string): void {
    if (formato === 'pdf' || formato === 'xlsx') {
        this.inventarioService.exportarReporte(formato, this.historialMovimientos).subscribe(blob => {
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = `reporte_movimientos.${formato}`;
            a.click();
            URL.revokeObjectURL(objectUrl);
        }, error => {
            console.error('Error al exportar el reporte:', error);
        });
    } else {
        console.error('Formato no soportado');
    }
}

  
}