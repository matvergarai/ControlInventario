import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  registrarPieza(pieza: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/piezas', pieza);
  }

  obtenerAlertasStockBajo(): Observable<any[]> {
    return this.http.get<any[]>('/api/alertas-stock-bajo');
  }

  generarOrdenReposicion(alerta: any): Observable<boolean> {
    return this.http.post<boolean>('/api/generar-orden-reposicion', alerta);
  }

  obtenerHistorialMovimientos(): Observable<any[]> {
    return this.http.get<any[]>('/api/historial-movimientos');
  }

  registrarMovimiento(movimiento: any): Observable<any> {
    return this.http.post<any>('/api/registrar-movimiento', movimiento);
  }

  obtenerNivelesStock(): Observable<any[]> {
    return this.http.get<any[]>('/api/niveles-stock');
  }

  actualizarNivelesStock(id: number, niveles: any): Observable<any> {
    return this.http.put<any>(`/api/piezas/${id}/niveles-stock`, niveles);
  }
}