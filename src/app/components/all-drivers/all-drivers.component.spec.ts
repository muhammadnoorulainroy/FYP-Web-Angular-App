import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDriversComponent } from './all-drivers.component';

describe('AllDriversComponent', () => {
  let component: AllDriversComponent;
  let fixture: ComponentFixture<AllDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
