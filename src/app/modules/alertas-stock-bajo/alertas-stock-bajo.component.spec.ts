import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasStockBajoComponent } from './alertas-stock-bajo.component';

describe('AlertasStockBajoComponent', () => {
  let component: AlertasStockBajoComponent;
  let fixture: ComponentFixture<AlertasStockBajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertasStockBajoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertasStockBajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
