import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVansComponent } from './all-vans.component';

describe('AllVansComponent', () => {
  let component: AllVansComponent;
  let fixture: ComponentFixture<AllVansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
