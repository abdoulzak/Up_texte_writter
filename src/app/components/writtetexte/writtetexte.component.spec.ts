import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittetexteComponent } from './writtetexte.component';

describe('WrittetexteComponent', () => {
  let component: WrittetexteComponent;
  let fixture: ComponentFixture<WrittetexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittetexteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrittetexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
