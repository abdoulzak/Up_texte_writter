import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalcommandeComponent } from './detalcommande.component';

describe('DetalcommandeComponent', () => {
  let component: DetalcommandeComponent;
  let fixture: ComponentFixture<DetalcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalcommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
