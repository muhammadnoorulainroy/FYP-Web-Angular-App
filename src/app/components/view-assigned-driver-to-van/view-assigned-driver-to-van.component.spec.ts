import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedDriverToVanComponent } from './view-assigned-driver-to-van.component';

describe('ViewAssignedDriverToVanComponent', () => {
  let component: ViewAssignedDriverToVanComponent;
  let fixture: ComponentFixture<ViewAssignedDriverToVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedDriverToVanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedDriverToVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
