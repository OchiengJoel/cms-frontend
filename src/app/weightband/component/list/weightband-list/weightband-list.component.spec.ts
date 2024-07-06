import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightbandListComponent } from './weightband-list.component';

describe('WeightbandListComponent', () => {
  let component: WeightbandListComponent;
  let fixture: ComponentFixture<WeightbandListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightbandListComponent]
    });
    fixture = TestBed.createComponent(WeightbandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
