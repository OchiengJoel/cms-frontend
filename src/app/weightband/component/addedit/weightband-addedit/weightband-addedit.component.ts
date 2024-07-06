import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeightBand } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';
import { WeightbandService } from 'src/app/weightband/service/weightband.service';

@Component({
  selector: 'app-weightband-addedit',
  templateUrl: './weightband-addedit.component.html',
  styleUrls: ['./weightband-addedit.component.css']
})
export class WeightbandAddeditComponent implements OnInit{

  title: string = "Branch Edit Form";
  isEditMode = false;
  weightBandForm!: FormGroup;
  selectedCompanyId: number | null = null;

  constructor(
    private companyService: CompanyService,
    private weightBandService: WeightbandService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WeightbandAddeditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: WeightBand
  ) {
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
      }
    });

    this.weightBandForm = this.fb.group({
      id: [''],
      minWeight: [''],
      maxWeight: ['', Validators.required],
      cost: ['', Validators.required]
      
    });

    if (this.data) {
      this.weightBandForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.selectedCompanyId !== null && this.weightBandForm.valid) {
      const weightBand = this.weightBandForm.value as WeightBand;

      if (this.isEditMode) {
        this.weightBandService.updateWeightBand(this.selectedCompanyId, weightBand.id, weightBand).subscribe(() => {
          this.snackBar.open('Branch Updated Successfully', 'Close', { duration: 4000 });
          this.dialogRef.close(true);
        }, error => {
          this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
        });
      } else {
        this.weightBandService.createWeightBand(this.selectedCompanyId, weightBand).subscribe(() => {
          this.snackBar.open('New Branch Added', 'Close', { duration: 4000 });
          this.dialogRef.close(true);
        }, error => {
          this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
        });
      }
    }
  }

  getErrorMessage(controlName: string, groupName?: string): string {
    const control = groupName ? this.weightBandForm.get(groupName)?.get(controlName) : this.weightBandForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

}
