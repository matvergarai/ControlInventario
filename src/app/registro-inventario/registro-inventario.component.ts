// registro-inventario.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../inventario.service';
import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-inventario',
  templateUrl: './registro-inventario.component.html',
  styleUrls: ['./registro-inventario.component.scss']
})
export class RegistroInventarioComponent implements OnInit {
  inventarioForm!: FormGroup;
  piezas: any[] = [];
  piezasFiltradas: any[] = [];
  searchTerm: string = '';
  registroExitoso: boolean = false;
  errorRegistro: string = '';
  enviandoRegistro: boolean = false;
  piezaSeleccionada: any = null;
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private inventarioService: InventarioService, 
    private loadingService: LoadingService,
    private router: Router  // Añadir esta línea
  ) { }

  ngOnInit(): void {
    this.inventarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      numeroSerie: ['', Validators.required],
      ubicacion: ['', Validators.required],
      cantidad: [0, Validators.required]
    });
    this.obtenerPiezas();
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 1200);
  }

  onSubmit() {
    if (this.inventarioForm.valid && !this.enviandoRegistro) {
      this.enviandoRegistro = true;
      this.inventarioService.registrarPieza(this.inventarioForm.value).subscribe(
        response => {
          this.piezas.push(response);
          this.inventarioForm.reset();
          this.buscarPiezas();
          this.registroExitoso = true;
          this.errorRegistro = '';
        },
        error => {
          this.registroExitoso = false;
          this.errorRegistro = 'Ocurrió un error al registrar la pieza. Por favor, inténtelo de nuevo más tarde.';
        },
        () => {
          this.enviandoRegistro = false;
        }
      );
    } else {
      this.markFieldsAsTouched();
    }
  }

  markFieldsAsTouched() {
    Object.values(this.inventarioForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  obtenerPiezas(): void {
    this.inventarioService.obtenerPiezas().subscribe(piezas => {
      console.log(piezas);  // Check if 'nombre' is present in the logged data
      this.piezas = piezas;
      this.buscarPiezas();
    });
  }

  reabastecerStock(pieza: any) {
    // Aquí puedes redirigir al componente de reabastecimiento con los detalles de la pieza
    // o abrir un modal directamente para reabastecer
    this.router.navigate(['/reabastecer-stock'], { queryParams: { id: pieza._id, cantidad: pieza.cantidad } });
  }

  editarPieza(pieza: any): void {
    this.piezaSeleccionada = pieza;
    this.showModal = true;
  }
  buscarPiezas(): void {
    this.piezasFiltradas = this.piezas.filter(pieza =>
      pieza._id.includes(this.searchTerm) || pieza.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  eliminarPieza(id: string): void {
    this.inventarioService.eliminarPieza(id).subscribe(() => {
      this.piezas = this.piezas.filter(pieza => pieza._id !== id);
      this.buscarPiezas();
    });
  }
  cerrarModal(): void {
    this.showModal = false;
  }

  actualizarPiezaActualizada(piezaActualizada: any): void {
    const index = this.piezas.findIndex(pieza => pieza._id === piezaActualizada._id);
    if (index !== -1) {
      this.piezas[index] = piezaActualizada;
      this.buscarPiezas();
    }
  }
}
