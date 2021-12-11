import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedVanToDriverComponent } from './view-assigned-van-to-driver.component';

describe('ViewAssignedVanToDriverComponent', () => {
  let component: ViewAssignedVanToDriverComponent;
  let fixture: ComponentFixture<ViewAssignedVanToDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedVanToDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedVanToDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
