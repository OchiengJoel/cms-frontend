import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParcelItem } from 'src/app/parcel-item/model/parcel-item';
import { ParcelItemService } from 'src/app/parcel-item/service/parcel-item.service';

@Component({
  selector: 'app-parcel-items-add',
  templateUrl: './parcel-items-add.component.html',
  styleUrls: ['./parcel-items-add.component.css']
})
export class ParcelItemsAddComponent implements OnInit{

  title: string;
  isEditMode = false;
  itemTypeList = ["GOODS", "SERVICE"]
  parcelItemForm: FormGroup | any;

  constructor(
    private parcelItemService: ParcelItemService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ParcelItemsAddComponent>,    
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ParcelItem
  ) {

    this.title = "Add New Parcel Item";
    
  }
  ngOnInit(): void {
    this.parcelItemForm = this.builder.group({
      id: this.builder.control(''),
      itemType: this.builder.control('', Validators.required),
      itemName: this.builder.control('', Validators.required),
      itemDescription: this.builder.control('', Validators.required),
    });

    if (this.data) {
      this.isEditMode = true;
      this.parcelItemForm.patchValue(this.data);
    }
  }


  onSubmit(): void {
    if (this.parcelItemForm.valid) {
      const parcelItem = this.parcelItemForm.value as ParcelItem;

      if (this.isEditMode) {
        this.parcelItemService.updateParcelItem(parcelItem).subscribe(() => {
          this.snackBar.open('Item updated', 'Close', {
            duration: 2000
          });
          this.dialogRef.close(true);
        });
      } else {
        this.parcelItemService.createParcelItem(parcelItem).subscribe(() => {
          this.snackBar.open('Item created', 'Close', {
            duration: 2000
          });
          this.dialogRef.close(true);
        });
      }
    }
  }


  // onSubmit(): void{
  //   this.parcelItemService.createParcelItem(this.parcelItemForm.value).subscribe({
  //     next:() => {
  //       alert("Item Added Successfully");
  //       this.parcelItemForm.reset();
  //       this.dialog.close(true);
  //     },
  //     error(err) {
  //       console.error(err);
  //       alert("Error Creating Item")
  //     },
      
  //   })
  // }

}
