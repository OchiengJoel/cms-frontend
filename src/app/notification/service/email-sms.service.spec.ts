import { TestBed } from '@angular/core/testing';

import { EmailSmsService } from './email-sms.service';

describe('EmailSmsService', () => {
  let service: EmailSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
