import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPiezaModalComponent } from './editar-pieza-modal.component';

describe('EditarPiezaModalComponent', () => {
  let component: EditarPiezaModalComponent;
  let fixture: ComponentFixture<EditarPiezaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPiezaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPiezaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
