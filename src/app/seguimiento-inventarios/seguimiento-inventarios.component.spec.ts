import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoInventariosComponent } from './seguimiento-inventarios.component';

describe('SeguimientoInventariosComponent', () => {
  let component: SeguimientoInventariosComponent;
  let fixture: ComponentFixture<SeguimientoInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoInventariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeguimientoInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
