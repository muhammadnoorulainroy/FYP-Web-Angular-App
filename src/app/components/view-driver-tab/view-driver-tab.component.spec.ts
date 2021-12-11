import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDriverTabComponent } from './view-driver-tab.component';

describe('ViewDriverTabComponent', () => {
  let component: ViewDriverTabComponent;
  let fixture: ComponentFixture<ViewDriverTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDriverTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDriverTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
