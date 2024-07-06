import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmailConfigComponent } from './list-email-config.component';

describe('ListEmailConfigComponent', () => {
  let component: ListEmailConfigComponent;
  let fixture: ComponentFixture<ListEmailConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEmailConfigComponent]
    });
    fixture = TestBed.createComponent(ListEmailConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
