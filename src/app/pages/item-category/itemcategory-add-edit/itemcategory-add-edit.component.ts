import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ItemCategoryService } from 'src/app/service/icat/item-category.service';

@Component({
  selector: 'app-itemcategory-add-edit',
  templateUrl: './itemcategory-add-edit.component.html',
  styleUrls: ['./itemcategory-add-edit.component.css']
})
export class ItemcategoryAddEditComponent implements OnInit {

  title: string;
  
  icatForm: FormGroup;
  typeList: string[] = ['Goods', 'Service'];

  constructor(
    private builder: FormBuilder,
    private service: ItemCategoryService,
    private dialogRef: MatDialogRef<ItemcategoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
  ){
    this.title = "Add Item Category Form";

    this.icatForm = this.builder.group({
      type:this.builder.control('', Validators.required),
      code:this.builder.control('', Validators.required),
      name:this.builder.control('', Validators.required),
      
    });

    if (this.data) {
      this.icatForm.patchValue(this.data);
    }

  }

  ngOnInit(): void {}


  onSubmit() {
    if (this.icatForm.valid) {
      if (this.data) {
        this.service.updateItemCategory(this.data.id, this.icatForm.value).subscribe({
          next: () => {
            alert('Item Details Updated Successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert('Error While Updating Data...');
          },
        });
      } else {
        this.service.addItemCategory(this.icatForm.value).subscribe({
          next: () => {
            alert('Item Category Added Successfully');
            this.icatForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert('Error While Trying To Submit New Item...');
          },
        });
      }
    }
  }
}