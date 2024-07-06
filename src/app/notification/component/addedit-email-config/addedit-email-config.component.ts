import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/company/service/company.service';
import { EmailSmsService } from '../../service/email-sms.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailSettings } from 'src/app/company/model/company';

@Component({
  selector: 'app-addedit-email-config',
  templateUrl: './addedit-email-config.component.html',
  styleUrls: ['./addedit-email-config.component.css']
})
export class AddeditEmailConfigComponent implements OnInit{

  title: string;
  isEditMode = false;
  emailSettingsForm!: FormGroup;
  selectedCompanyId: null | null = null;

  constructor(
    private companyService: CompanyService,
    private emailService: EmailSmsService,
    public dialogRef: MatDialogRef<AddeditEmailConfigComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: EmailSettings

  ){

    this.title = data ? "Edit Company" : "Add New Company";
    this.isEditMode = !!data;
  }

  
  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id ! == null) {
        this.selectedCompanyId = id        
      }
    });

    this.emailSettingsForm = this.fb.group({
      id: [''],
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.data) {
      this.emailSettingsForm.patchValue(this.data);
    }

  }

  onSubmit(): void{

    if (this.selectedCompanyId !== null && this.emailSettingsForm.valid) {
      const emailSettings = this.emailSettingsForm.value as EmailSettings;

      if (this.isEditMode) {

        this.emailService.updateEmailSettings(this.selectedCompanyId, emailSettings.id, emailSettings).subscribe(() => {
          this.snackBar.open(`Email Settings Updated Successfully: ${Error}`, 'Close', {duration: 6000});
          this.dialogRef.close(true)
        },error => {
          this.snackBar.open(`Error Updating Email Config: ${Error}`, 'Close', {duration:4000})
        })
        
      } else{
        this.emailService.createEmailSettings(this.selectedCompanyId, emailSettings).subscribe(() => {
          this.snackBar.open(`Created Successfully: ${Error}`, 'Close', {duration: 4000});
          this.dialogRef.close(true);
        }, error => {
          this.snackBar.open(`Error Creating New Email Config: ${Error}`, 'Close', {duration:4000})
        } )
      }     
      
    }

  }

  getErrorMessage(controlName: string, groupName?: string): string {
    const control = groupName ? this.emailSettingsForm.get(groupName)?.get(controlName) : this.emailSettingsForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }


}
