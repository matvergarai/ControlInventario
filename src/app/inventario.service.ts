import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor() { }

  registrarPieza(pieza: any): Observable<any> {
    // Aquí podrías realizar una llamada HTTP real para registrar la pieza en el servidor
    // Por simplicidad, solo imprimimos los datos de la pieza y devolvemos un Observable con algún resultado simulado
    console.log('Registrando pieza:', pieza);
    return of({ success: true, message: 'Pieza registrada exitosamente' });
  }

  obtenerAlertasStockBajo(): Observable<any[]> {
    // Implementación simulada para obtener alertas de stock bajo
    const alertas: any[] = [
      { id: 1, descripcion: 'Pieza A', nivelStock: 5 },
      { id: 2, descripcion: 'Pieza B', nivelStock: 3 },
      { id: 3, descripcion: 'Pieza C', nivelStock: 2 }
    ];
    return of(alertas);
  }

  generarOrdenReposicion(alerta: any): Observable<boolean> {
    // Implementación simulada para generar una orden de reposición
    console.log('Generando orden de reposición para:', alerta);
    return of(true);
  }

  obtenerHistorialMovimientos(): Observable<any[]> {
    // Implementación simulada para obtener el historial de movimientos del inventario
    const movimientos: any[] = [
      { id: 1, descripcion: 'Movimiento 1', fecha: '2024-04-01', tipo: 'Entrada' },
      { id: 2, descripcion: 'Movimiento 2', fecha: '2024-04-03', tipo: 'Salida' },
      { id: 3, descripcion: 'Movimiento 3', fecha: '2024-04-05', tipo: 'Entrada' }
    ];
    return of(movimientos);
  }

  registrarMovimiento(movimiento: any): Observable<any> {
    // Implementación simulada para registrar un nuevo movimiento de inventario
    console.log('Registrando movimiento:', movimiento);
    // Aquí puedes realizar la llamada HTTP real para registrar el movimiento en el servidor
    // Por simplicidad, devolvemos un Observable con algún resultado simulado
    return of({ success: true, message: 'Movimiento registrado exitosamente' });
  }
}