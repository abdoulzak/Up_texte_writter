import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidecommandeComponent } from './validecommande.component';

describe('ValidecommandeComponent', () => {
  let component: ValidecommandeComponent;
  let fixture: ComponentFixture<ValidecommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidecommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
