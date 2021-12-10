import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversTabComponent } from './drivers-tab.component';

describe('DriversTabComponent', () => {
  let component: DriversTabComponent;
  let fixture: ComponentFixture<DriversTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
