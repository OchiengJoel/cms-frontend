import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddeditComponent } from './branch-addedit.component';

describe('BranchAddeditComponent', () => {
  let component: BranchAddeditComponent;
  let fixture: ComponentFixture<BranchAddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchAddeditComponent]
    });
    fixture = TestBed.createComponent(BranchAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
