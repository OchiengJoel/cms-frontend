import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Accounts } from 'src/app/model/accounts';

@Component({
  selector: 'app-accounts-edit',
  templateUrl: './accounts-edit.component.html',
  styleUrls: ['./accounts-edit.component.css']
})
export class AccountsEditComponent {

  accountForm: FormGroup;
  accountTypes: string[] = ['ASSET', 'LIABILITIES', 'OWNERS EQUITY', 'INCOME', 'EXPENSES'];

  constructor(
    private dialogRef: MatDialogRef<AccountsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Accounts,
    private formBuilder: FormBuilder
  ) {
    this.accountForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      accountName: [data.accountName, Validators.required],
      accountType: [data.accountType, Validators.required],
      code: [data.code, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const updatedAccount: Accounts = this.accountForm.value;
      this.dialogRef.close(updatedAccount);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
