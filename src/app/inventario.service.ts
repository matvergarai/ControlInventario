import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registrarPieza(pieza: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/piezas`, pieza);
  }

  obtenerAlertasStockBajo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alertas-stock-bajo`);
  }

  generarOrdenReposicion(alerta: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/generar-orden-reposicion`, alerta);
  }

  obtenerHistorialMovimientos(): Observable<any[]> {
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
}
