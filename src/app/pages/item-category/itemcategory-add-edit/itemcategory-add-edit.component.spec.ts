import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcategoryAddEditComponent } from './itemcategory-add-edit.component';

describe('ItemcategoryAddEditComponent', () => {
  let component: ItemcategoryAddEditComponent;
  let fixture: ComponentFixture<ItemcategoryAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemcategoryAddEditComponent]
    });
    fixture = TestBed.createComponent(ItemcategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
