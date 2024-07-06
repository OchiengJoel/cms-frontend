import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParcelItem } from 'src/app/parcel-item/model/parcel-item';
import { ParcelItemService } from 'src/app/parcel-item/service/parcel-item.service';

@Component({
  selector: 'app-parcel-items-edit',
  templateUrl: './parcel-items-edit.component.html',
  styleUrls: ['./parcel-items-edit.component.css']
})
export class ParcelItemsEditComponent {

  title: string;
  parcelItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parcelItemService: ParcelItemService,
    private dialogRef: MatDialogRef<ParcelItemsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParcelItem
  ) {

    this.title = "Parcel Item Editing Form",

    console.log(`Recieved Data:`, data)
    this.parcelItemForm = this.fb.group({
      itemType: [data.itemType, Validators.required],
      itemName: [data.itemName, Validators.required],
      itemDescription: [data.itemDescription, Validators.required]
    });
  }

  ngOnInit(): void {}

  // onSubmit() {
  //   if (this.parcelItemForm.valid) {
  //     const updatedItem: ParcelItem = {
  //       id: this.data.id, // Ensure the id is included
  //       ...this.parcelItemForm.value
  //     };
  
  //     console.log('Updating parcel item with ID:', this.data.id); // Log the ID
  //     console.log('Updated parcel item data:', updatedItem); // Log the updated item data
  
  //     this.parcelItemService.updateParcelItem(this.data.id, updatedItem)
  //       .subscribe({
  //         next: (response) => {
  //           this.dialogRef.close(true);
  //         },
  //         error: (err) => {
  //           console.error('Error updating parcel item', err);
  //         }
  //       });
  //   }
  // }

  onCancel() {
    this.dialogRef.close(false);
  }
}



//console.log('Received data:', data); // Log the received data