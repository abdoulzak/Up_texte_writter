import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcommandeComponent } from './newcommande.component';

describe('NewcommandeComponent', () => {
  let component: NewcommandeComponent;
  let fixture: ComponentFixture<NewcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
