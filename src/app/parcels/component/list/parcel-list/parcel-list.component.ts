import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from 'src/app/company/service/company.service';
import { ParcelService } from 'src/app/parcels/service/parcel.service';
import { ParcelAddeditComponent } from '../../addedit/parcel-addedit/parcel-addedit.component';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Papa } from 'ngx-papaparse';
import { Parcel } from 'src/app/company/model/company';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {

  deleteSelectedBranches() {
    throw new Error('Method not implemented.');
  } 

  title: string;
  selectedCompanyId: number | null = null;
  displayedColumns: string[] = ["select", "trackingReference", "dateRecorded", "fromName", "fromPhone", "fromEmail", "toName", "toPhone", "toEmail", "fromBranch", "toBranch", "itemDescription", "weight", "cost", "status", "action"];
  dataSource: MatTableDataSource<Parcel> = new MatTableDataSource<Parcel>([]);
  selection: Set<Parcel> = new Set<Parcel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(
    private companyService: CompanyService,
    private parcelService: ParcelService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private papa: Papa
  ) {
    this.title = "Parcel List";
  }
  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.fetchParcels();
      }
    });
  }


  fetchParcels(): void {
    if (this.selectedCompanyId !== null) {
      this.parcelService.getAllParcels(this.selectedCompanyId).subscribe(parcels => {
        this.dataSource.data = parcels;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection.clear();
      }, error => {
        this.snackBar.open(`Error fetching parcels: ${error}`, 'Close', { duration: 6000 });
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

  applyDateFilter(): void {
    this.dataSource.filterPredicate = (data: Parcel, filter: string) => {
      const startDate = this.startDate ? new Date(this.startDate).getTime() : null;
      const endDate = this.endDate ? new Date(this.endDate).getTime() : null;
      const dateRecorded = new Date(data.dateRecorded).getTime();

      if (startDate && endDate) {
        return dateRecorded >= startDate && dateRecorded <= endDate;
      } else if (startDate) {
        return dateRecorded >= startDate;
      } else if (endDate) {
        return dateRecorded <= endDate;
      } else {
        return true;
      }
    };

    // Trigger filter update by assigning a new random value
    this.dataSource.filter = '' + Math.random();
  }

  resetFilters(): void {
    this.startDate = null;
    this.endDate = null;
    this.applyDateFilter(); // Clear any applied filters
    this.fetchParcels(); // Refresh the parcel listing
  }

  openFormDialog(parcel?: Parcel): void {
    const dialogRef = this.dialog.open(ParcelAddeditComponent, {
      width: '800px',
      data: parcel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchParcels();
      }
    });
  }

  deleteParcel(parcelId:number): void {
    if (this.selectedCompanyId !== null && window.confirm('Confirm You Intend To Delete Highlighted Parcel')) {

      this.parcelService.deleteParcel(this.selectedCompanyId, parcelId).subscribe(() => {
        this.snackBar.open('Parcel Deleted Successfully', 'Close', {
          duration:4000
        });
        this.fetchParcels();
      }, error => {
        this.snackBar.open('Error Performing This Operation: ${error}', 'Close', {
          duration:4000
        })
      }
    )      
    }
  }

  toggleAll(event: any): void {
    if (event.checked) {
      this.dataSource.data.forEach(parcel => this.selection.add(parcel));
    } else {
      this.selection.clear();
    }
  }

  toggleSelection(parcel: Parcel): void {
    if (this.selection.has(parcel)) {
      this.selection.delete(parcel);
    } else {
      this.selection.add(parcel);
    }
  }

  isAllSelected(): boolean {
    return this.selection.size === this.dataSource.data.length;
  }

  isSomeSelected(): boolean {
    return this.selection.size > 0 && this.selection.size < this.dataSource.data.length;
  }

  hasSelectedParcels(): boolean {
    return this.selection.size > 0;
  }


  // exportData(format: string): void {
  //   const dataToExport = this.dataSource.data.map(parcel => ({
  //     Tracking_No: parcel.fromContact,
  //     From_Name: parcel.fromContact,
  //     Email: parcel.fromEmail,
  //     Contact: parcel.fromContact
  //   }));

  exportData(format: string): void {
    const dataToExport = this.dataSource.data.map(parcel => ({
      'Tracking No.': parcel.trackingReference,
      'Record Date': parcel.dateRecorded,
      'Sender': parcel.fromName,
      'Sender Phone': parcel.fromPhone,
      'Sender Email': parcel.fromEmail,
      'Receiver': parcel.toName,
      'Receiver Phone': parcel.toPhone,
      'Receiver Email': parcel.toEmail,
      'From Branch': parcel.fromBranchId, // Assuming branchName is the property of Branch
      'To Branch': parcel.toBranchId,     // Assuming branchName is the property of Branch
      'Item Description': parcel.itemDescription,
      'Weight (KG)': parcel.weight,
      'Cost (KSh)': parcel.cost,
      'Status': parcel.status
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
    this.saveAsExcelFile(excelBuffer, 'parcels');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }


  exportAsPDF(data: any[]): void {
    const doc = new jsPDF();
    (doc as any).autoTable({ html: '#my-table' });
    doc.save('parcels.pdf');
  }

  exportAsCSV(data: any[]): void {
    const csvData = this.papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'parcels.csv');
  }

}
