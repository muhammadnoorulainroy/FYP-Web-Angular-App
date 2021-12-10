import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVanComponent } from './add-van.component';

describe('AddVanComponent', () => {
  let component: AddVanComponent;
  let fixture: ComponentFixture<AddVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
