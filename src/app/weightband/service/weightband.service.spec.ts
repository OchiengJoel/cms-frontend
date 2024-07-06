import { TestBed } from '@angular/core/testing';

import { WeightbandService } from './weightband.service';

describe('WeightbandService', () => {
  let service: WeightbandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightbandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
