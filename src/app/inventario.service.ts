import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Articulo } from './model/articulo.model';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registrarPieza(pieza: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/piezas`, pieza);
  }

  obtenerPiezasConBajoStock(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/piezas`).pipe(
      map(piezas => piezas.filter(pieza => pieza.cantidad < 5))
    );
  }

  generarOrdenCompra(articulo: Articulo): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/generar-orden-compra`, articulo);
  }

  generarOrdenesReposicion(piezas: Articulo[]): Observable<boolean[]> {
    const observables = piezas.map(pieza => this.generarOrdenCompra(pieza));
    return forkJoin(observables); // Importa forkJoin desde 'rxjs'
  }
  obtenerHistorialMovimientos(fechaInicio: string, fechaFin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historial-movimientos`);
  }

  registrarMovimiento(movimiento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar-movimiento`, movimiento);
  }

  obtenerNivelesStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/niveles-stock`);
  }

  actualizarNivelesStock(id: number, niveles: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/piezas/${id}/niveles-stock`, niveles);
  }
  seguimientoInventario():Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}/seguimiento-inventarios`);

  }
  monitorearStock(): Observable<Articulo[]> {
    return timer(0, 60000).pipe( // Verifica cada minuto
      switchMap(() => this.obtenerNivelesStock())
    );
  }

  exportarReporte(formato: string, datos: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/exportar-reporte?formato=${formato}`, datos, { responseType: 'blob' });
  }

  obtenerPiezas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/piezas`);
  }

  actualizarPieza(id: string, cambios: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/piezas/${id}`, cambios);
  }

  eliminarPieza(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/piezas/${id}`);
  }
  obtenerRegistrosAcciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/registros-acciones`);
  }
  
}
