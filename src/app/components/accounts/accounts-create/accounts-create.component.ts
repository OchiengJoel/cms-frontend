import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from 'src/app/service/accounts/accounts.service';

@Component({
  selector: 'app-accounts-create',
  templateUrl: './accounts-create.component.html',
  styleUrls: ['./accounts-create.component.css']
})
export class AccountsCreateComponent {

  title: string;
  accountForm: FormGroup;
  typeList: string[] = ['ASSET', 'LIABILITIES', 'OWNERS EQUITY', 'INCOME', 'EXPENSES'];
  

  constructor(
    private builder: FormBuilder,
    private service: AccountsService,
    public dialogRef: MatDialogRef<AccountsCreateComponent>

  ) {
    this.title = "Add Account";

    this.accountForm = this.builder.group({
      code:this.builder.control(''),
      accountType:this.builder.control('', Validators.required),
      accountName:this.builder.control('', Validators.required),
    });
  }

  onSubmit(): void {
    this.service.createAccount(this.accountForm.value).subscribe({
      next: () => {
        alert('Account Added Successfully');
        this.accountForm.reset();
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
        alert('Error Creating New Account');
      },
    });
  }


}
