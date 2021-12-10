import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVanToDriverComponent } from './assign-van-to-driver.component';

describe('AssignVanToDriverComponent', () => {
  let component: AssignVanToDriverComponent;
  let fixture: ComponentFixture<AssignVanToDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignVanToDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVanToDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
