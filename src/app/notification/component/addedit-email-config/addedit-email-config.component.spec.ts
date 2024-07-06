import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditEmailConfigComponent } from './addedit-email-config.component';

describe('AddeditEmailConfigComponent', () => {
  let component: AddeditEmailConfigComponent;
  let fixture: ComponentFixture<AddeditEmailConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditEmailConfigComponent]
    });
    fixture = TestBed.createComponent(AddeditEmailConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
