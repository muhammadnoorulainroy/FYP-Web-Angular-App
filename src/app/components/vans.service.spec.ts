import { TestBed } from '@angular/core/testing';

import { VansService } from './firebase-service';

describe('VansService', () => {
  let service: VansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
