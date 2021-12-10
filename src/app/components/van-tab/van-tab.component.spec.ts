import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanTabComponent } from './van-tab.component';

describe('VanTabComponent', () => {
  let component: VanTabComponent;
  let fixture: ComponentFixture<VanTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VanTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VanTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
