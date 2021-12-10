import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsTabComponent } from './complaints-tab.component';

describe('ComplaintsTabComponent', () => {
  let component: ComplaintsTabComponent;
  let fixture: ComponentFixture<ComplaintsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
