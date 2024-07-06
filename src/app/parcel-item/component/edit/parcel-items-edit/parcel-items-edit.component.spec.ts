import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelItemsEditComponent } from './parcel-items-edit.component';

describe('ParcelItemsEditComponent', () => {
  let component: ParcelItemsEditComponent;
  let fixture: ComponentFixture<ParcelItemsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelItemsEditComponent]
    });
    fixture = TestBed.createComponent(ParcelItemsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
