import { group } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Accounts } from 'src/app/model/accounts';
import { AccountsService } from 'src/app/service/accounts/accounts.service';
import { AccountsCreateComponent } from '../accounts-create/accounts-create.component';
import { AccountsLedgerComponent } from '../accounts-ledger/accounts-ledger.component';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { AccountsEditComponent } from '../accounts-edit/accounts-edit.component';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {

  title: string;
  accountsList !: Accounts[];
  //datasource: any;
  datasource: MatTableDataSource<Accounts> = new MatTableDataSource<Accounts>();
  
  groupedAccounts: { accountType: string, accounts: Accounts[] }[] = [];
  displayedColumns: string[] = ["code", "accountType", "accountName", "accountBalance", "action"];
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: AccountsService,
    private dialog: MatDialog

  ) {

    this.title = "Chart of Accounts"

  }
  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.service.getAccounts().subscribe(res => {
      this.accountsList = res;
      // Group accounts by Account Type
      this.groupedAccounts = this.accountsList.reduce((groups: any, account: Accounts) => {
        const group = groups.find((g: any) => g.accountType === account.accountType);
        if (group) {
          group.accounts.push(account);
        } else {
          groups.push({ accountType: account.accountType, accounts: [account] });
        }
        return groups;
      }, []);

      this.groupedAccounts.forEach(group => {
        group.accounts.sort((a, b) => a.code.localeCompare(b.code));
      });

      // Assign data to datasource
      this.datasource.data = this.accountsList;
      // Assign sort to datasource
      this.datasource.sort = this.sort;
    });
  }



  Filterchange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.datasource.filter = value;
  }


  openAddAccountDialog(): void {
    const dialogRef = this.dialog.open(AccountsCreateComponent);
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val) {
        this.getAccounts(); // Refresh accounts after adding a new one
      }
    });
  }



  openLedger(account: Accounts): void {
    const dialogRef = this.dialog.open(AccountsLedgerComponent, {
      data: {
        ledgerEntries: account.ledgerEntries,
        accountName: account.accountName
      }
    });
  }

  editAccount(account: Accounts): void {
    const dialogRef = this.dialog.open(AccountsEditComponent, {
      data: account
    });

    dialogRef.afterClosed().subscribe((updatedAccount: Accounts) => {
      if (updatedAccount) {
        this.service.updateAccount(updatedAccount.id, updatedAccount).subscribe(() => {
          // Reload accounts after update
          this.getAccounts();
        });
      }
    });
  }
  deleteAccount(account: Accounts): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this account?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteAccount(account.id).subscribe(() => {
          // Reload accounts after delete
          this.getAccounts();
        })
      }
    })
  }

}
