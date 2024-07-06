import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailSmsService } from '../../service/email-sms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmailSettings } from 'src/app/company/model/company';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompanyService } from 'src/app/company/service/company.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AddeditEmailConfigComponent } from '../addedit-email-config/addedit-email-config.component';

@Component({
  selector: 'app-list-email-config',
  templateUrl: './list-email-config.component.html',
  styleUrls: ['./list-email-config.component.css']
})
export class ListEmailConfigComponent implements OnInit{
hasSelectedBranches() {
throw new Error('Method not implemented.');
}
deleteSelectedBranches() {
throw new Error('Method not implemented.');
}

applyFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}

toggleAll($event: MatCheckboxChange) {
throw new Error('Method not implemented.');
}
isAllSelected(): import("@angular/cdk/coercion").BooleanInput {
throw new Error('Method not implemented.');
}
isSomeSelected(): import("@angular/cdk/coercion").BooleanInput {
throw new Error('Method not implemented.');
}
selection: any;
toggleSelection(_t45: any) {
throw new Error('Method not implemented.');
}
deleteEmail(arg0: any) {
throw new Error('Method not implemented.');
}


  title: string;
  selectedCompanyId: number | null = null;
  displayedColumns: string [] = ["host", "port", "username", "password", "action"];
  datasource: MatTableDataSource<EmailSettings>= new MatTableDataSource<EmailSettings>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private companyService: CompanyService,
    private emailService:EmailSmsService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
  ){
    this.title = "Email Config"
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.fetchEmailSettings();        
      }
    }) 
  }
  fetchEmailSettings():void{
    if (this.selectedCompanyId != null) {
      this.emailService.getAllEmailSettings(this.selectedCompanyId).subscribe(emailSettings => {
        this.datasource.data = emailSettings;
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      }, error => {
        this.snackBar.open(`Error Fetching Email Configs: ${error}`, 'Close', {duration:6000})
      })
      
    }
  }

  openFormDialog(emailSettings?: EmailSettings): void {
    const dialogRef = this.dialog.open(AddeditEmailConfigComponent, {
      width: '600px',
      data: emailSettings
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEmailSettings();
      }
    });
  }



}
