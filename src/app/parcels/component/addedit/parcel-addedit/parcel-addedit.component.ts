import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from 'src/app/branch/service/branch.service';
import { Branch, Parcel } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';
import { ParcelService } from 'src/app/parcels/service/parcel.service';

@Component({
  selector: 'app-parcel-addedit',
  templateUrl: './parcel-addedit.component.html',
  styleUrls: ['./parcel-addedit.component.css']
})
export class ParcelAddeditComponent implements OnInit{

  isEditMode = false;
  parcelForm!: FormGroup;
  selectedCompanyId: number | null = null;
  parcelStatusList = ["RECORDED", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
  branches: Branch[] = [];

  constructor(
    private companyService: CompanyService,
    private parcelService: ParcelService,
    private branchService: BranchService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ParcelAddeditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Parcel
  ) {
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.fetchBranches();
      }
    });

    this.parcelForm = this.fb.group({
      id: [''],
      trackingReference: [''],
      dateRecorded: ['', Validators.required],
      fromName: ['', Validators.required],
      fromEmail: ['', Validators.email],
      fromPhone: ['', Validators.required],
      toName: ['', Validators.required],
      toEmail: ['', Validators.email],
      toPhone: ['', Validators.required],
      fromBranchId: [null, Validators.required],
      toBranchId: [null, Validators.required],
      itemDescription: ['', Validators.required],
      cost: [''],
      weight: ['', Validators.required],
      status: ['RECORDED']
    });

    if (this.data) {
      this.parcelForm.patchValue(this.data);
    }
  }

  fetchBranches(): void {
    if (this.selectedCompanyId !== null) {
      this.branchService.getAllBranches(this.selectedCompanyId).subscribe(branches => {
        this.branches = branches;
      });
    }
  }

  onSubmit(): void {
    if (this.selectedCompanyId !== null && this.parcelForm.valid) {
      const formValue = this.parcelForm.value;
      const parcel: Parcel = {
        ...formValue,
        dateRecorded: new Date(formValue.dateRecorded).toISOString(),
        fromBranchId: Number(formValue.fromBranchId),
        toBranchId: Number(formValue.toBranchId)
      };

      console.log('Form Data:', parcel); // Log form data for debugging
      console.log('Edit Mode:', this.isEditMode); // Log edit mode for debugging

      if (this.isEditMode) {
        if (parcel.id) {
          this.parcelService.updateParcel(this.selectedCompanyId, parcel.id, parcel).subscribe(() => {
            this.snackBar.open('Parcel Updated Successfully', 'Close', {
              duration: 6000
            });
            this.dialogRef.close(true);
          }, error => {
            console.error('Error updating parcel:', error);
            this.snackBar.open(`Error Performing Action: ${error}`, 'Close', {
              duration: 6000
            });
          });
        } else {
          console.error('Error: Parcel ID is missing');
          this.snackBar.open('Error: Parcel ID is missing', 'Close', {
            duration: 6000
          });
        }
      } else {
        this.parcelService.createParcel(this.selectedCompanyId, parcel).subscribe(() => {
          this.snackBar.open('Parcel Created Successfully', 'Close', { duration: 6000 });
          this.dialogRef.close(true);
        }, error => {
          console.error('Error creating parcel:', error);
          this.snackBar.open(`Error Performing This Action: ${error}`, 'Close', { duration: 6000 });
        });
      }
    }
  }

 
  getErrorMessage(controlName: string, groupName?: string): string {
    const control = groupName ? this.parcelForm.get(groupName)?.get(controlName) : this.parcelForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    if (this.parcelForm.hasError('sameBranch') && (controlName === 'fromBranch' || controlName === 'toBranch')) {
      return 'From Branch and To Branch cannot be the same';
    }
    return '';
  }

 

}
