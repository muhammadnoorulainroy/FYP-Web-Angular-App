import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVanStudentDetailsComponent } from './view-van-student-details.component';

describe('ViewVanStudentDetailsComponent', () => {
  let component: ViewVanStudentDetailsComponent;
  let fixture: ComponentFixture<ViewVanStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVanStudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVanStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
