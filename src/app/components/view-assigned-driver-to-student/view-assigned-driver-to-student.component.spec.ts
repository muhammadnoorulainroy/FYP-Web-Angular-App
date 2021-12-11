import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedDriverToStudentComponent } from './view-assigned-driver-to-student.component';

describe('ViewAssignedDriverToStudentComponent', () => {
  let component: ViewAssignedDriverToStudentComponent;
  let fixture: ComponentFixture<ViewAssignedDriverToStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedDriverToStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedDriverToStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
