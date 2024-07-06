import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditSmsConfigComponent } from './addedit-sms-config.component';

describe('AddeditSmsConfigComponent', () => {
  let component: AddeditSmsConfigComponent;
  let fixture: ComponentFixture<AddeditSmsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditSmsConfigComponent]
    });
    fixture = TestBed.createComponent(AddeditSmsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
