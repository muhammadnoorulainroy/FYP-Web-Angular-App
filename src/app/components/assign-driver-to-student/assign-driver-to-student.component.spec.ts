import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverToStudentComponent } from './assign-driver-to-student.component';

describe('AssignDriverToStudentComponent', () => {
  let component: AssignDriverToStudentComponent;
  let fixture: ComponentFixture<AssignDriverToStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDriverToStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriverToStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
