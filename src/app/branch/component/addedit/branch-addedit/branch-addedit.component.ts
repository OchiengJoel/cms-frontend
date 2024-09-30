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

  private readonly SUCCESS_UPDATE_MESSAGE = 'Branch Updated Successfully';
  private readonly SUCCESS_CREATE_MESSAGE = 'New Branch Added';
  private readonly ERROR_MESSAGE = 'Error: ';

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

    this.initForm();

    if (this.data) {
      this.branchForm.patchValue(this.data);
    }
  }


  private initForm(): void {
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
  }

  // onSubmit(): void {
  //   if (this.selectedCompanyId !== null && this.branchForm.valid) {
  //     const branch = this.branchForm.value as Branch;

  //     if (this.isEditMode) {
  //       this.branchService.updateBranch(this.selectedCompanyId, branch.id, branch).subscribe(() => {
  //         this.snackBar.open('Branch Updated Successfully', 'Close', { duration: 4000 });
  //         this.dialogRef.close(true);
  //       }, error => {
  //         this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
  //       });
  //     } else {
  //       this.branchService.createBranch(this.selectedCompanyId, branch).subscribe(() => {
  //         this.snackBar.open('New Branch Added', 'Close', { duration: 4000 });
  //         this.dialogRef.close(true);
  //       }, error => {
  //         this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
  //       });
  //     }
  //   }
  // }

  onSubmit(): void {
    if (this.selectedCompanyId !== null && this.branchForm.valid) {
      const branch = this.branchForm.value as Branch;

      const request = this.isEditMode
        ? this.branchService.updateBranch(this.selectedCompanyId, branch.id, branch)
        : this.branchService.createBranch(this.selectedCompanyId, branch);

      request.subscribe(() => {
        this.snackBar.open(this.isEditMode ? this.SUCCESS_UPDATE_MESSAGE : this.SUCCESS_CREATE_MESSAGE, 'Close', { duration: 4000 });
        this.dialogRef.close(true);
      }, error => {
        this.snackBar.open(`${this.ERROR_MESSAGE}${error}`, 'Close', { duration: 6000 });
      });
    }
  }


  getErrorMessage(controlName: string, groupName?: string): string {
    const control = this.getControl(controlName, groupName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  private getControl(controlName: string, groupName?: string) {
    return groupName ? this.branchForm.get(groupName)?.get(controlName) : this.branchForm.get(controlName);
  }


}
