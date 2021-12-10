import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVanTabComponent } from './view-van-tab.component';

describe('ViewVanTabComponent', () => {
  let component: ViewVanTabComponent;
  let fixture: ComponentFixture<ViewVanTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVanTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
