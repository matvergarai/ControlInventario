import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { InventarioService } from '../inventario.service';

interface Pieza {
  nombre: string;
  cantidad: number;
  ubicacion: string;
}

@Component({
  selector: 'app-stock-niveles',
  templateUrl: './nivel-stock.component.html',
  styleUrls: ['./nivel-stock.component.scss']
})
export class StockNivelesComponent implements OnInit {
  chartOption: EChartsOption = {};

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.inventarioService.obtenerPiezas().subscribe((piezas: Pieza[]) => {
      const data = piezas.map(pieza => ({ value: pieza.cantidad, name: pieza.nombre, ubicacion: pieza.ubicacion }));
      const categories = piezas.map(pieza => pieza.nombre);

      this.chartOption = {
        title: {
          text: 'Niveles de Stock'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params: any) => {
            const data = params[0].data;
            return `${data.name}<br/>Cantidad: ${data.value}<br/>Ubicación: ${data.ubicacion}`;
          }
        },
        xAxis: {
          type: 'category',
          data: categories
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Stock',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'inside'
            }
          }
        ]
      };
    });
  }
}
