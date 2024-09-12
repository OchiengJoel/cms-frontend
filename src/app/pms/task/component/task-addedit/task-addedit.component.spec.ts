import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddeditComponent } from './task-addedit.component';

describe('TaskAddeditComponent', () => {
  let component: TaskAddeditComponent;
  let fixture: ComponentFixture<TaskAddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAddeditComponent]
    });
    fixture = TestBed.createComponent(TaskAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
