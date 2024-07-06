import { TestBed } from '@angular/core/testing';

import { ParcelItemService } from './parcel-item.service';

describe('ParcelItemService', () => {
  let service: ParcelItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
