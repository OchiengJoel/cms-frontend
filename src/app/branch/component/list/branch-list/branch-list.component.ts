import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BranchService } from 'src/app/branch/service/branch.service';
import { Branch } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';
import { BranchAddeditComponent } from '../../addedit/branch-addedit/branch-addedit.component';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {

  title: string = 'Branches List';
  selectedCompanyId: number | null = null;
  displayedColumns: string[] = ["select", "branchCode", "branchName", "email", "contact", "action"];
  dataSource: MatTableDataSource<Branch> = new MatTableDataSource<Branch>([]);
  selection: Set<Branch> = new Set<Branch>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private companyService: CompanyService,
    private branchService: BranchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private papa: Papa
  ) { }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.fetchBranches();
      }
    });
  }

  // fetchBranches(): void{
  //   const companyId = 1;
  //   this.branchService.getAllBranches(this.companyId).subscribe( branches => {
  //     this.dataSource.data = branches;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
  

  fetchBranches(): void {
    if (this.selectedCompanyId !== null) {
      this.branchService.getAllBranches(this.selectedCompanyId).subscribe(branches => {
        this.dataSource.data = branches;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection.clear();
      }, error => {
        this.snackBar.open(`Error fetching branches: ${error}`, 'Close', { duration: 6000 });
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openFormDialog(branch?: Branch): void {
    const dialogRef = this.dialog.open(BranchAddeditComponent, {
      width: '600px',
      data: branch
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchBranches();
      }
    });
  }

  deleteBranch(branchId: number): void {
    if (this.selectedCompanyId !== null && window.confirm("Are you sure you want to delete the selected item?")) {
      this.branchService.deleteBranch(this.selectedCompanyId, branchId).subscribe(() => {
        this.snackBar.open('Branch Deleted Successfully', 'Close', { duration: 4000 });
        this.fetchBranches();
      }, error => {
        this.snackBar.open(`Error deleting branch: ${error}`, 'Close', { duration: 6000 });
      });
    }
  }

  deleteSelectedBranches(): void {
    if (this.selectedCompanyId !== null && this.hasSelectedBranches() && window.confirm("Are you sure you want to delete the selected items?")) {
      const ids = Array.from(this.selection).map(branch => branch.id);
      this.branchService.deleteSelectedBranches(this.selectedCompanyId, ids).subscribe(() => {
        this.snackBar.open('Selected Branches Deleted Successfully', 'Close', { duration: 4000 });
        this.fetchBranches();
      }, error => {
        this.snackBar.open(`Error deleting selected branches: ${error}`, 'Close', { duration: 6000 });
      });
    }
  }

  toggleAll(event: any): void {
    if (event.checked) {
      this.dataSource.data.forEach(branch => this.selection.add(branch));
    } else {
      this.selection.clear();
    }
  }

  toggleSelection(branch: Branch): void {
    if (this.selection.has(branch)) {
      this.selection.delete(branch);
    } else {
      this.selection.add(branch);
    }
  }

  isAllSelected(): boolean {
    return this.selection.size === this.dataSource.data.length;
  }

  isSomeSelected(): boolean {
    return this.selection.size > 0 && this.selection.size < this.dataSource.data.length;
  }

  hasSelectedBranches(): boolean {
    return this.selection.size > 0;
  }

  

  exportData(format: string): void {
    const dataToExport = this.dataSource.data.map(branch => ({
      Code: branch.branchCode,
      Name: branch.branchName,
      Email: branch.address?.email,
      Contact: branch.address?.contact
    }));

    switch (format) {
      case 'excel':
        this.exportAsExcel(dataToExport);
        break;
      case 'pdf':
        this.exportAsPDF(dataToExport);
        break;
      case 'csv':
        this.exportAsCSV(dataToExport);
        break;
    }
  }
 

  exportAsExcel(data: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'branches');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }


  exportAsPDF(data: any[]): void {
    const doc = new jsPDF();
    (doc as any).autoTable({ html: '#my-table' });
    doc.save('branches.pdf');
  }

  exportAsCSV(data: any[]): void {
    const csvData = this.papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'branches.csv');
  }


}
