import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationprisetexteComponent } from './confirmationprisetexte.component';

describe('ConfirmationprisetexteComponent', () => {
  let component: ConfirmationprisetexteComponent;
  let fixture: ComponentFixture<ConfirmationprisetexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationprisetexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationprisetexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
