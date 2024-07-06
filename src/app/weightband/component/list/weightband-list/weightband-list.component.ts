import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WeightBand } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';
import { WeightbandService } from 'src/app/weightband/service/weightband.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeightbandAddeditComponent } from '../../addedit/weightband-addedit/weightband-addedit.component';

@Component({
  selector: 'app-weightband-list',
  templateUrl: './weightband-list.component.html',
  styleUrls: ['./weightband-list.component.css']
})
export class WeightbandListComponent implements OnInit{



  title: string;
  selectedCompanyId: number | null = null;
  displayedColumns: string[]=["select","minWeight", "maxWeight", "cost", "action"];
  datasource:MatTableDataSource<WeightBand> = new MatTableDataSource<WeightBand>([]);
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  selection: Set<WeightBand> = new Set<WeightBand>();

  constructor(
    private companyService:CompanyService,
    private weightBandService: WeightbandService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ){
    this.title = "WeightBand List";  

  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe( id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.fetchWeightBands();
        
      }

    });
  }

  fetchWeightBands(): void {
    if (this.selectedCompanyId !== null ) {
      this.weightBandService.getAllWeightBands(this.selectedCompanyId).subscribe(weightBands => {
        this.datasource.data = weightBands;
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        this.selection.clear();
      },
      error => {
        this.snackBar.open(`Error Loading WeightBands: ${error}`, 'Close', {
          duration: 4000
        })
      })
      
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  openFormDialog(weightBand?: WeightBand): void {
    const dialogRef = this.dialog.open(WeightbandAddeditComponent, {
      width: '600px',
      data: weightBand
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchWeightBands();
      }
    });
  }

  toggleAll(event: any): void {
    if (event.checked) {
      this.datasource.data.forEach(weightBand => this.selection.add(weightBand));
    } else {
      this.selection.clear();
    }
  }

  toggleSelection(weightBand: WeightBand): void {
    if (this.selection.has(weightBand)) {
      this.selection.delete(weightBand);
    } else {
      this.selection.add(weightBand);
    }
  }

  isAllSelected(): boolean {
    return this.selection.size === this.datasource.data.length;
  }

  isSomeSelected(): boolean {
    return this.selection.size > 0 && this.selection.size < this.datasource.data.length;
  }

  hasSelectedWeightBands(): boolean {
    return this.selection.size > 0;
  }

  deleteWeightBand(weightBandId: number): void {
    if (this.selectedCompanyId !== null && window.confirm("Are you sure you want to delete the selected item?")) {
      this.weightBandService.deleteWeightBand(this.selectedCompanyId, weightBandId).subscribe(() => {
        this.snackBar.open('WeightBand Deleted Successfully', 'Close', { duration: 4000 });
        this.fetchWeightBands();
      }, error => {
        this.snackBar.open(`Error deleting WeightBand: ${error}`, 'Close', { duration: 6000 });
      });
    }
  }

  // deleteSelectedWeightBands(): void {
  //   if (this.selectedCompanyId !== null && this.hasSelectedWeightBands() && window.confirm("Are you sure you want to delete the selected items?")) {
  //     const ids = Array.from(this.selection).map(branch => branch.id);
  //     this.weightBandService.deleteSelectedBranches(this.selectedCompanyId, ids).subscribe(() => {
  //       this.snackBar.open('Selected Branches Deleted Successfully', 'Close', { duration: 4000 });
  //       this.fetchWeightBands();
  //     }, error => {
  //       this.snackBar.open(`Error deleting selected branches: ${error}`, 'Close', { duration: 6000 });
  //     });
  //   }
  // }

}
