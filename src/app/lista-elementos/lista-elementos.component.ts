import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-lista-elementos',
  templateUrl: './lista-elementos.component.html',
  styleUrls: ['./lista-elementos.component.scss']
})
export class ListaElementosComponent implements OnInit {
  piezas: any[] = [];
  piezasFiltradas: any[] = [];
  searchForm: FormGroup;
  editForm: FormGroup;
  piezaEditando: any = null;

  constructor(
    private inventarioService: InventarioService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });

    this.editForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      numeroSerie: ['', Validators.required],
      ubicacion: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerPiezas();
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(300)  // Añade un retraso de 300ms para evitar demasiadas búsquedas mientras el usuario escribe
    ).subscribe(value => {
      this.buscarPiezas(value);
    });
  }

  obtenerPiezas(): void {
    this.inventarioService.obtenerPiezas().subscribe(
      piezas => {
        this.piezas = piezas;
        this.piezasFiltradas = piezas;
        console.log(this.piezas); // Verificar los datos en la consola
      },
      error => {
        console.error('Error al obtener piezas:', error);
      }
    );
  }

  buscarPiezas(term: string): void {
    if (term) {
      this.piezasFiltradas = this.piezas.filter(pieza =>
        pieza.nombre.toLowerCase().includes(term.toLowerCase()) ||
        pieza._id.toLowerCase().includes(term.toLowerCase()) ||
        pieza.descripcion.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.piezasFiltradas = this.piezas;
    }
  }

  iniciarEdicion(pieza: any): void {
    this.piezaEditando = pieza;
    this.editForm.patchValue(pieza);
  }

  cancelarEdicion(): void {
    this.piezaEditando = null;
  }

  guardarCambios(): void {
    if (this.editForm.valid) {
      this.inventarioService.actualizarPieza(this.piezaEditando._id, this.editForm.value).subscribe(response => {
        this.piezaEditando = null;
        this.obtenerPiezas();
      });
    }
  }

  eliminarPieza(id: string): void {
    this.inventarioService.eliminarPieza(id).subscribe(() => {
      this.piezas = this.piezas.filter(pieza => pieza._id !== id);
      this.buscarPiezas(this.searchForm.get('searchTerm')?.value);
    });
  }
}
