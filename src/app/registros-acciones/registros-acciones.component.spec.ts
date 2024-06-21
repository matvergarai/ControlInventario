import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosAccionesComponent } from './registros-acciones.component';

describe('RegistrosAccionesComponent', () => {
  let component: RegistrosAccionesComponent;
  let fixture: ComponentFixture<RegistrosAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosAccionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrosAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
