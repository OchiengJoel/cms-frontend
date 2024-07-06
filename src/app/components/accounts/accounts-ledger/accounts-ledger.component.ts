import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-accounts-ledger',
  templateUrl: './accounts-ledger.component.html',
  styleUrls: ['./accounts-ledger.component.css']
})
export class AccountsLedgerComponent {

  title: string;
  ledgerData: any;
  ledgerColumns = ['recordingDate', 'bankingDate', 'transactionNumber', 'referenceNumber', 'debit', 'credit', 'runningBalance']


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.title = "Statement Of Account"
    this.ledgerData = data;

  }

}
