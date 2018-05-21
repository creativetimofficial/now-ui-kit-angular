import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingColorsComponent } from './changing-colors.component';

describe('ChangingColorsComponent', () => {
  let component: ChangingColorsComponent;
  let fixture: ComponentFixture<ChangingColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangingColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangingColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
