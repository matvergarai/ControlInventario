import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../../inventario.service';
@Component({
  selector: 'app-editar-pieza-modal',
  templateUrl: './editar-pieza-modal.component.html',
  styleUrls: ['./editar-pieza-modal.component.scss']
})
export class EditarPiezaModalComponent implements OnInit {
  @Input() pieza: any;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<any>();

  editarForm!: FormGroup;

  constructor(private fb: FormBuilder, private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.editarForm = this.fb.group({
      nombre: [this.pieza.nombre, [Validators.required, Validators.minLength(2)]],
      descripcion: [this.pieza.descripcion, [Validators.required, Validators.minLength(3)]],
      numeroSerie: [this.pieza.numeroSerie, Validators.required],
      ubicacion: [this.pieza.ubicacion, Validators.required],
      cantidad: [this.pieza.cantidad, Validators.required]
    });
  }

  onSubmit() {
    if (this.editarForm.valid) {
      this.inventarioService.actualizarPieza(this.pieza._id, this.editarForm.value).subscribe(response => {
        this.update.emit(response);
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
