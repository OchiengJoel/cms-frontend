import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';

@Component({
  selector: 'app-company-add-edit',
  templateUrl: './company-add-edit.component.html',
  styleUrls: ['./company-add-edit.component.css']
})
export class CompanyAddEditComponent implements OnInit {

  title: string;
  isEditMode = false;
  companyForm!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CompanyAddEditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ) {
    this.title = data ? "Edit Company" : "Add New Company";
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      id: [''],
      companyName: ['', Validators.required],
      address: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        contact: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        regNo: ['', Validators.required],
        postalAddress: ['', Validators.required]
      })
    });

    if (this.data) {
      this.companyForm.patchValue(this.data);
    }
  }

  // onSubmit(): void {
  //   if (this.companyForm.valid) {
  //     const company = this.companyForm.value as Company;

  //     if (this.isEditMode) {
  //       this.companyService.updateCompany(company).subscribe(() => {
  //         this.snackBar.open('Company Details Updated', 'Close', {
  //           duration: 2000
  //         });
  //         this.dialogRef.close(true);
  //       });
  //     } else {
  //       this.companyService.createCompany(company).subscribe(() => {
  //         this.snackBar.open('New Company Added', 'Close', {
  //           duration: 2000
  //         });
  //         this.dialogRef.close(true);
  //       });
  //     }
  //   }
  // }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const company = this.companyForm.value as Company;

      if (this.isEditMode) {
        this.companyService.updateCompany(company).subscribe(() => {
            this.snackBar.open('Company Details Updated', 'Close', {
              duration: 6000
            });
            this.dialogRef.close(true);
          },
          (error) => {
            this.snackBar.open(`Error: ${error}`, 'Close', {
              duration: 6000
            });
          }
        );
      } else {
        this.companyService.createCompany(company).subscribe(
          () => {
            this.snackBar.open('New Company Added', 'Close', {
              duration: 6000
            });
            this.dialogRef.close(true);
          },
          (error) => {
            this.snackBar.open(`Error: ${error}`, 'Close', {
              duration: 6000
            });
          }
        );
      }
    }
  }

  getErrorMessage(controlName: string, groupName?: string): string {
    const control = groupName ? this.companyForm.get(groupName)?.get(controlName) : this.companyForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }


}
