import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSmsConfigComponent } from './list-sms-config.component';

describe('ListSmsConfigComponent', () => {
  let component: ListSmsConfigComponent;
  let fixture: ComponentFixture<ListSmsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSmsConfigComponent]
    });
    fixture = TestBed.createComponent(ListSmsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
