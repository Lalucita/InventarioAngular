import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoMovimientoComponent } from './motivo-movimiento.component';

describe('MotivoMovimientoComponent', () => {
  let component: MotivoMovimientoComponent;
  let fixture: ComponentFixture<MotivoMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotivoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
