import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { LoadingService } from '../loading.service';
@Component({
  selector: 'app-alertas-stock-bajo',
  templateUrl: './alertas-stock-bajo.component.html',
  styleUrls: ['./alertas-stock-bajo.component.scss'] // Ajusta la extensión del archivo aquí
})
export class AlertasStockBajoComponent implements OnInit {
  alertasStockBajo: any[] = [];

  constructor(private inventarioService: InventarioService, private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.obtenerAlertasStockBajo();

    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 1200)
  }

  obtenerAlertasStockBajo(): void {
    this.inventarioService.obtenerAlertasStockBajo().subscribe(alertas => {
      this.alertasStockBajo = alertas;
    });
  }

  generarOrdenReposicion(alerta: any): void {
    this.inventarioService.generarOrdenReposicion(alerta).subscribe(result => {
      if (result) {
        console.log('Orden de reposición generada con éxito.');
        this.obtenerAlertasStockBajo();
      } else {
        console.error('Error al generar la orden de reposición.');
      }
    });
  }
}