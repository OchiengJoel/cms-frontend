import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelItemsComponent } from './parcel-items.component';

describe('ParcelItemsComponent', () => {
  let component: ParcelItemsComponent;
  let fixture: ComponentFixture<ParcelItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelItemsComponent]
    });
    fixture = TestBed.createComponent(ParcelItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
