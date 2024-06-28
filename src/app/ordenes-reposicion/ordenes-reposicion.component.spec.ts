import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesReposicionComponent } from './ordenes-reposicion.component';

describe('OrdenesReposicionComponent', () => {
  let component: OrdenesReposicionComponent;
  let fixture: ComponentFixture<OrdenesReposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesReposicionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdenesReposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
