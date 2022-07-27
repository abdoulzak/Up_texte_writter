import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestniveauComponent } from './testniveau.component';

describe('TestniveauComponent', () => {
  let component: TestniveauComponent;
  let fixture: ComponentFixture<TestniveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestniveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestniveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
