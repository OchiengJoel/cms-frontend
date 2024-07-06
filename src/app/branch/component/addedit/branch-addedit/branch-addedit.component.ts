import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from 'src/app/branch/service/branch.service';
import { Branch } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';

@Component({
  selector: 'app-branch-addedit',
  templateUrl: './branch-addedit.component.html',
  styleUrls: ['./branch-addedit.component.css']
})
export class BranchAddeditComponent implements OnInit {


  title: string = "Branch Edit Form";
  isEditMode = false;
  branchForm!: FormGroup;
  selectedCompanyId: number | null = null;

  constructor(
    private companyService: CompanyService,
    private branchService: BranchService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BranchAddeditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Branch
  ) {
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
      }
    });

    this.branchForm = this.fb.group({
      id: [''],
      branchCode: [''],
      branchName: ['', Validators.required],
      address: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        contact: ['', Validators.required],
        location: ['', Validators.required]
      })
    });

    if (this.data) {
      this.branchForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.selectedCompanyId !== null && this.branchForm.valid) {
      const branch = this.branchForm.value as Branch;

      if (this.isEditMode) {
        this.branchService.updateBranch(this.selectedCompanyId, branch.id, branch).subscribe(() => {
          this.snackBar.open('Branch Updated Successfully', 'Close', { duration: 4000 });
          this.dialogRef.close(true);
        }, error => {
          this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
        });
      } else {
        this.branchService.createBranch(this.selectedCompanyId, branch).subscribe(() => {
          this.snackBar.open('New Branch Added', 'Close', { duration: 4000 });
          this.dialogRef.close(true);
        }, error => {
          this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
        });
      }
    }
  }

  getErrorMessage(controlName: string, groupName?: string): string {
    const control = groupName ? this.branchForm.get(groupName)?.get(controlName) : this.branchForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

}
