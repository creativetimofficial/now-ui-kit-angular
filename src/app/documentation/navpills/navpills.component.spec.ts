import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavpillsComponent } from './navpills.component';

describe('NavpillsComponent', () => {
  let component: NavpillsComponent;
  let fixture: ComponentFixture<NavpillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavpillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavpillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
