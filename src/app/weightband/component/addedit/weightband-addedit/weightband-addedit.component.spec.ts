import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightbandAddeditComponent } from './weightband-addedit.component';

describe('WeightbandAddeditComponent', () => {
  let component: WeightbandAddeditComponent;
  let fixture: ComponentFixture<WeightbandAddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightbandAddeditComponent]
    });
    fixture = TestBed.createComponent(WeightbandAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
