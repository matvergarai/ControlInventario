import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelStockComponent } from './nivel-stock.component';

describe('NivelStockComponent', () => {
  let component: NivelStockComponent;
  let fixture: ComponentFixture<NivelStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NivelStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NivelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
