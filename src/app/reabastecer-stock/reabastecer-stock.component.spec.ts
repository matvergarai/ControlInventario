import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReabastecerStockComponent } from './reabastecer-stock.component';

describe('ReabastecerStockComponent', () => {
  let component: ReabastecerStockComponent;
  let fixture: ComponentFixture<ReabastecerStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReabastecerStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReabastecerStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
