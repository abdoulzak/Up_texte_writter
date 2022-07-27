import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritetestniveauComponent } from './writetestniveau.component';

describe('WritetestniveauComponent', () => {
  let component: WritetestniveauComponent;
  let fixture: ComponentFixture<WritetestniveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritetestniveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritetestniveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
