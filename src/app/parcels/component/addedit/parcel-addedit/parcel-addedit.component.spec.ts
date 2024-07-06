import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelAddeditComponent } from './parcel-addedit.component';

describe('ParcelAddeditComponent', () => {
  let component: ParcelAddeditComponent;
  let fixture: ComponentFixture<ParcelAddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelAddeditComponent]
    });
    fixture = TestBed.createComponent(ParcelAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
