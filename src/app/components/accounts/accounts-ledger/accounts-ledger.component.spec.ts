import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsLedgerComponent } from './accounts-ledger.component';

describe('AccountsLedgerComponent', () => {
  let component: AccountsLedgerComponent;
  let fixture: ComponentFixture<AccountsLedgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsLedgerComponent]
    });
    fixture = TestBed.createComponent(AccountsLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
