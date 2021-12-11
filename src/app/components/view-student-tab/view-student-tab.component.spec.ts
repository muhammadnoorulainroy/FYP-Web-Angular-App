import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentTabComponent } from './view-student-tab.component';

describe('ViewStudentTabComponent', () => {
  let component: ViewStudentTabComponent;
  let fixture: ComponentFixture<ViewStudentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
