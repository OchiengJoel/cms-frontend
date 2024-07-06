import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelItemsAddComponent } from './parcel-items-add.component';

describe('ParcelItemsAddComponent', () => {
  let component: ParcelItemsAddComponent;
  let fixture: ComponentFixture<ParcelItemsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelItemsAddComponent]
    });
    fixture = TestBed.createComponent(ParcelItemsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
