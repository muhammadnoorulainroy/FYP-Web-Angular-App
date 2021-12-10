import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComplaintsComponent } from './all-complaints.component';

describe('AllComplaintsComponent', () => {
  let component: AllComplaintsComponent;
  let fixture: ComponentFixture<AllComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
