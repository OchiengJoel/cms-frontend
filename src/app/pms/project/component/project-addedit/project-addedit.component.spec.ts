import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddeditComponent } from './project-addedit.component';

describe('ProjectAddeditComponent', () => {
  let component: ProjectAddeditComponent;
  let fixture: ComponentFixture<ProjectAddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectAddeditComponent]
    });
    fixture = TestBed.createComponent(ProjectAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
