import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControlErrorsComponent } from './input-control-errors.component';

describe('InputControlErrorsComponent', () => {
  let component: InputControlErrorsComponent;
  let fixture: ComponentFixture<InputControlErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputControlErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputControlErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
