import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxRadioSwitchComponent } from './checkbox-radio-switch.component';

describe('CheckboxRadioSwitchComponent', () => {
  let component: CheckboxRadioSwitchComponent;
  let fixture: ComponentFixture<CheckboxRadioSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxRadioSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxRadioSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
