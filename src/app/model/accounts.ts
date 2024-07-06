export interface Accounts {
    id: number,
    accountName: string,
    accountType: string,
    code: string,
    ledgerEntries: LedgerEntry[]; // Add ledgerEntries property
}

export interface LedgerEntry {
    recordingDate: string;
    bankingDate: string;
    transactionNumber: string;
    referenceNumber: string;
    debit: number;
    credit: number;
    runningBalance: number;
  }
