import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVanDetailsComponent } from './view-van-details.component';

describe('ViewVanDetailsComponent', () => {
  let component: ViewVanDetailsComponent;
  let fixture: ComponentFixture<ViewVanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVanDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
