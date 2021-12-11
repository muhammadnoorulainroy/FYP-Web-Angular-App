import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedStudentsToDriverComponent } from './view-assigned-students-to-driver.component';

describe('ViewAssignedStudentsToDriverComponent', () => {
  let component: ViewAssignedStudentsToDriverComponent;
  let fixture: ComponentFixture<ViewAssignedStudentsToDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedStudentsToDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedStudentsToDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
